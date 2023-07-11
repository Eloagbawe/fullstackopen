const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

let token;
let users;

const initialBlogs = [
  {
    title: "My first Blog post",
    author: "Jess Day",
    url: "url",
    likes: 12,
  },
  {
    title: "My second Blog post",
    author: "Nick Winston",
    url: "url",
    likes: 16,
  },
  {
    title: "My third Blog post",
    author: "Cece Gates",
    url: "url",
    likes: 9,
  },
];

beforeAll(async () => {
  const login = await api
    .post("/api/login")
    .send({ username: "root", password: "sekret" })
    .expect(200);

  token = login.body.token;
  users = await User.find({});
});

beforeEach(async () => {
  initialBlogs.forEach((blog) => (blog.user = users[0].id));
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[2]);
  await blogObject.save();
});

describe("When initially some blogs are saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("correct amount of blog posts are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("Blog posts have a unique identifier named id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => expect(blog.id).toBeDefined());
  });
});

describe("addition of a new blog", () => {
  test("succeeds with valid data", async () => {
    const user = await api.get("/api/users");
    const newBlog = {
      title: "My fourth Blog post",
      author: "Barry White",
      url: "url",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length + 1);

    const blogTitles = response.body.map((blog) => blog.title);
    expect(blogTitles).toContain("My fourth Blog post");
  });

  test("with the likes property absent, it defaults to the value 0", async () => {
    const newBlog = {
      title: "My fourth Blog post",
      author: "Barry White",
      url: "url",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const newAdd = response.body.find((blog) => blog.author === "Barry White");
    expect(newAdd.likes).toBe(0);
  });

  test("fails with status code 400 if the likes and url property are absent in the request", async () => {
    const newBlog = {
      author: "Barry White",
      likes: 53,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("fails with status 401 if token is absent in the request", async () => {
    const newBlog = {
      title: "Patience",
      url: "url",
      author: "Dru Phillips",
      likes: 8,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });
});

describe("updating a blog", () => {
  test("succeeds with a valid id", async () => {
    const blogs = await api.get("/api/blogs");
    const blogToBeUpdated = blogs.body[0];
    const blog = {
      title: "My first Blog post",
      author: "Jess Day",
      url: "url",
      likes: 18,
    };

    await api
      .put(`/api/blogs/${blogToBeUpdated.id}`, blog, {
        new: true,
        runValidators: true,
      })
      .expect(200);
  });
});

describe("deleting a blog", () => {
  test("succeeds with a valid id", async () => {
    const blogsAtStart = await api.get("/api/blogs");
    const blogToDelete = blogsAtStart.body[0];
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await api.get("/api/blogs");
    expect(blogsAtEnd.body).toHaveLength(initialBlogs.length - 1);

    const authors = blogsAtEnd.body.map((blog) => blog.author);
    expect(authors).not.toContain(blogToDelete.author);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

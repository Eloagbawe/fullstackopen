const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "My first Blog post",
    "author": "Jess Day",
    "url": "url",
    "likes": 10
  },
  {
    "title": "My second Blog post",
    "author": "Nick Winston",
    "url": "url",
    "likes": 26
  },
  {
    "title": "My third Blog post",
    "author": "Cece Gates",
    "url": "url",
    "likes": 13
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()

})

describe('When initially some blogs are saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct amount of blog posts are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

})


test('Blog posts have a unique identifier named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

describe('addition of a new blog', () => {

  test('suceeds with valid data', async() =>{
    const newBlog = {
      "title": "My fourth Blog post",
      "author": "Barry White",
      "url": "url",
      "likes": 5
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)

    const blogTitles = response.body.map(blog => blog.title)
    expect(blogTitles).toContain("My fourth Blog post")
  })

  test('with the likes property absent, it defaults to the value 0', async() => {
    const newBlog = {
      "title": "My fourth Blog post",
      "author": "Barry White",
      "url": "url"
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const newAdd = response.body.find(blog => blog.author === "Barry White")
    expect(newAdd.likes).toBe(0)  
  })

  test('fails with status code 400 if the likes and url property are absent in the request', async() => {
    const newBlog = {
      "author": "Barry White",
      "likes": 53
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

})




afterAll(() => {
  mongoose.connection.close()
})
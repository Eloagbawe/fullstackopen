const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const userExtractor = require("../utils/middleware").userExtractor;

blogsRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
      .populate("user", {
        username: 1,
        name: 1,
      })
      .populate("comments", {
        text: 1,
      });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

blogsRouter.post("/", userExtractor, async (req, res, next) => {
  const body = req.body;

  try {
    if (!body.title || !body.url) {
      res.status(400).json({
        error: "title or url missing",
      });
    } else {
      const user = await User.findById(req.user.id);
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id,
      });

      const result = await blog.save();
      user.blogs = user.blogs.concat(result._id);
      await user.save();
      res.status(201).json(result);
    }
  } catch (err) {
    next(err);
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  const body = req.body;
  try {
    const blogToBeUpdated = await Blog.findById(req.params.id);
    const blog = {
      title: body.title || blogToBeUpdated.title,
      author: body.author || blogToBeUpdated.author,
      url: body.url || blogToBeUpdated.url,
      likes: body.likes || blogToBeUpdated.likes,
      user: body.user || blogToBeUpdated.user,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedBlog);
  } catch (err) {
    next(err);
  }
});

blogsRouter.delete("/:id", userExtractor, async (req, res, next) => {
  try {
    const blogToBeDeleted = await Blog.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (blogToBeDeleted.user.toString() === user.id.toString()) {
      const blogIdIndex = user.blogs.indexOf(blogToBeDeleted.id);
      user.blogs.splice(blogIdIndex, 1);
      user.save();
      await Blog.findByIdAndRemove(req.params.id);
      res.status(204).end();
    }
  } catch (err) {
    next(err);
  }
});

blogsRouter.post("/:id/comments", userExtractor, async (req, res, next) => {
  try {
    const body = req.body;
    const blogToBeUpdated = await Blog.findById(req.params.id);

    if (!body.text) {
      res.status(400).json({
        error: "comment text missing",
      });
    } else {
      const comment = new Comment({
        text: body.text,
        blog: blogToBeUpdated._id,
      });
      const result = await comment.save();
      blogToBeUpdated.comments = blogToBeUpdated.comments.concat(result._id);
      await blogToBeUpdated.save();
      res.status(201).json(result);
    }
  } catch (err) {
    next(err);
  }
});
module.exports = blogsRouter;

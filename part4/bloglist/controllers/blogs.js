const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
  }catch(err){
   next(err)
  }
})

  
blogsRouter.post('/', userExtractor, async (req, res, next) => {
  const body = req.body
  
  try {
    if (!body.title || !body.url){
      res.status(400).json({
        "error": "title or url missing"
      })
    }
    else {
      
  // const decodedToken = jwt.verify(req.token, process.env.SECRET)
  // if (!req.token || !decodedToken.id) {
  //   return res.status(401).json({ error: 'token missing or invalid' })
  // }
  // const user = await User.findById(decodedToken.id)

  const user = await User.findById(req.user.id)
      const blog = new Blog({
        "title":body.title,
        "author": body.author,
        "url":body.url,
        "likes":body.likes || 0,
        "user":user._id
      })
      
      const result = await blog.save()
      user.blogs = user.blogs.concat(result._id)
      await user.save()
      res.status(201).json(result)
    } 
   }catch(err){
     next(err)
   }
})

  blogsRouter.put('/:id', async(req, res, next) => {
      const body = req.body
      try {
        const blogToBeUpdated = await Blog.findById(req.params.id)
        const blog = {
        title: body.title || blogToBeUpdated.title,
        author: body.author || blogToBeUpdated.author,
        url: body.url || blogToBeUpdated.url,
        likes: body.likes || blogToBeUpdated.likes
        }
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true, runValidators: true })
        res.status(200).json(updatedBlog)
      }catch(err){
        next(err)
      } 
  })

  blogsRouter.delete('/:id', userExtractor, async(req, res, next) => {
    try{
      const blogToBeDeleted = await Blog.findById(req.params.id)
      const user = await User.findById(req.user.id)
      
      if ( blogToBeDeleted.user.toString() === user._id.toString() ){
        await Blog.deleteOne(blogToBeDeleted)
        res.status(204).end()
      }
      
    }catch(err){
      next(err)
    }
  })
  
module.exports = blogsRouter
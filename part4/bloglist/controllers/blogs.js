const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
    res.json(blogs)
  }catch(err){
   next(err)
  }
})

  
blogsRouter.post('/', async (req, res, next) => {
    const body = req.body
   try {
    if (!body.title || !body.url){
      res.status(400).json({
        "error": "title or url missing"
      })
    }
    else {
      const blog = new Blog({
        "title":body.title,
        "author": body.author,
        "url":body.url,
        "likes":body.likes || 0
      })
      
      const result = await blog.save()
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

  blogsRouter.delete('/:id', async(req, res, next) => {
    try{
      await Blog.findByIdAndRemove(req.params.id)
      res.status(204).end()
    }catch(err){
      next(err)
    }
  })
  
module.exports = blogsRouter
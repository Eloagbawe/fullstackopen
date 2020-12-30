const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async(req,res,next) => {
  const body = req.body
  const saltRounds = 10
  
  const passwordHash = await bcrypt.hash(body.password, saltRounds) 

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  try {
    if(body.password.length < 3){
      res.status(400).json({
        "error":"Password length should be longer than 3 characters"
      })
    } else {
      const savedUser = await user.save()
      res.status(201).json(savedUser)
    }
  }catch(err){
    next(err)
  }

})
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {url: 1, title:1, author:1, id:1})
  response.json(users)
})

module.exports = usersRouter
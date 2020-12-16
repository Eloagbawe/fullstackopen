const bcrypt = require('bcrypt')
const { request } = require('../app')
const usersRouter = require('express').Router
const User = require('../models/user')

usersRouter.post('/', async(req,res) => {
    const body = request.body
    const saltrounds = 10
    const hashedPassword = await bcrypt.hash(body.password, saltrounds )
})

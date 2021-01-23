require("dotenv").config()
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')


describe('when there is initially one user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})
  
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
  
    await user.save()
  })
  
    test('creation succeeds with a fresh username', async () => {
      let usersAtStart = await User.find({})
      usersAtStart = usersAtStart.map(u => u.toJSON())
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      let usersAtEnd = await User.find({})
      usersAtEnd = usersAtEnd.map(u => u.toJSON())
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContainEqual(newUser.username)
    })

    test('fails with status code 400 if username already exists', async () => {
      const newUser = {
        username: 'root',
        name: 'Matti Luukkainen',
        password: 'salanien',
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

        expect(async() => {
          await api
          .post('/api/users')
          .send(newUser)
          .toThrow(`User validation failed: username: Error, expected ``username`` to be unique. Value: ${newUser.username}`)
        })
        
    })

    test('fails with status code 400 if username is invalid', async () => {
      const newUser = {
        username: 'al',
        name: 'Matti Luukkainen',
        password: 'salanien',
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
  

        expect(async () =>{
          await api
          .post('/api/users')
          .send(newUser)
          .toThrow(`User validation failed: username: Path ``username`` ${newUser.username} is shorter than the minimum allowed length (3).`)
        })
    })
    test('fails with status code 400 if password is invalid', async () => {
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'sa',
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        
        expect(async () =>{
          await api
          .post('/api/users')
          .send(newUser)
          .toThrow(`Password length should be longer than 3 characters`)
        })
    })
  })

afterAll(() => {
    mongoose.connection.close()
})
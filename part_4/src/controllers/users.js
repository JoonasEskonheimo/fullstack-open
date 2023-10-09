const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/users', async (request, response) => {
  const { username, name, password } = request.body
    console.log(request.body)
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})
usersRouter.get('/users', async (request, response) => {
  
    const users = await User.find({}).populate('blogs')
    response.json(users)
  })

module.exports = usersRouter
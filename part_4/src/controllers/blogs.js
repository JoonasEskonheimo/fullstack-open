const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

blogsRouter.get('/blogs', async (request, response) => {
    let blogs = await Blog.find({}).populate('user')
      response.json(blogs)
  })
  
  blogsRouter.post('/blogs', async (request, response) => {
    const body = request.body
    const token = _getTokenFrom(request)

    if(token == null) {
        return response.status(403).end()
    }

    const decodedToken = jwt.verify(_getTokenFrom(request), process.env.LOGIN_JWT_SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        like: body.likes,
        user: user.id
    })
    const persistedBlog = await blog.save()
    
    return response.status(201).json(persistedBlog)
  })

  blogsRouter.delete('/blogs/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(200).end()
  })

  blogsRouter.put('/blogs/:id'), async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id, request.body)
    return response.status(204).end()
  }

  const _getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
  }

  const _verifyToken = (token, response) => {

  }
  module.exports = blogsRouter
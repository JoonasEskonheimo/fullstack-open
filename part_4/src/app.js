const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
app.use(cors())
app.use(express.json())
const API_BASE_PATH = '/api'
app.use(API_BASE_PATH,blogsRouter)
app.use(API_BASE_PATH,usersRouter)
app.use(API_BASE_PATH,loginRouter)



app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

module.exports = app
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const personsApi = require('./routes/person-api')
const app = express()
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('build'))
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
app.use(personsApi.router)
app.use(personsApi.errorHandler)








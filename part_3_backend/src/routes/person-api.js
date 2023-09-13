const express = require('express')
const router = express.Router()
const phonebookService = require('../services/phonebook-service')



router.get('/info', (request, response) => {
    const responseHtml = `Phonebook has info of ${phonebookService.getPersonsCount()}. <br/>${new Date()} `
    response.send(responseHtml)
})

router.get('/api/persons', (request, response, next) => {
    phonebookService.getPersons().then(persons => { response.json(persons) }).catch(error => {
        next(error)
    })
})
router.post('/api/persons', (request, response,next) => {
    if (validateRequest(request, response)) {
        const person = request.body
        phonebookService.savePerson(person).then(persistedPerson => {
            response.status(200).json(persistedPerson)
        }).catch((error) => {
            next(error)
        })
    }
})

router.get('/api/persons/:id', (request, response, next) => {
    const personId = request.params.id
    phonebookService.findPerson(personId).then(person => {
        console.log(person)
        if (person) {
            response.json(person)
        } else {
            response.status(401).end()
        }

    }).catch((error) => {
        next(error)
    })
})
router.delete('/api/persons/:id', (request, response, next) => {
    const personId = request.params.id
    phonebookService.deletePerson(personId).then(() => {
        response.status(200).end()
    }).catch(error => {
        next(error)
    })
})

const validateRequest = (request, response) => {
    if (!request.body.name) {
        response.status(400).send(createErrorResponse('name was missing'))
        return false
    }
    if (!request.body.number) {
        response.status(400).send(createErrorResponse('number was missing'))
        return false
    }
    if (phonebookService.nameExist(request.body.name)) {
        response.status(409).send(createErrorResponse('name must be unique'))
        return false
    }
    return true
}

const createErrorResponse = (message) => {
    let errorResponse = { "error": message }
    return errorResponse
}

const errorHandler = (error,request,response,next) => {
    console.log(error)
    if (error.name === 'CastError') {
        return response.status(400).send(createErrorResponse('malformatted id'))
    }
    return response.status(500).end()

}

module.exports = { router: router, errorHandler: errorHandler };
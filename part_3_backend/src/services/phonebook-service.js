const Person = require('../models/person')

const phonebookService = () => {
    
    let persons = [
        {
            "id": 1,
            "name": "Arto Hellas",
            "number": "040-123456"
        },
        {
            "id": 2,
            "name": "Ada Lovelace",
            "number": "39-44-5323523"
        },
        {
            "id": 3,
            "name": "Dan Abramov",
            "number": "12-43-234345"
        },
        {
            "id": 4,
            "name": "Mary Poppendieck",
            "number": "39-23-6423122"
        }
    ]

    const savePerson = (person) => {
        const personToPersist = new Person({
            name: person.name,
            number: person.number
    })
    return personToPersist.save()
    }
    
    const _createPersonId = () => {
        return Math.round(Math.random() * 100000000000)
    }

    const deletePerson = (id) => {
        return Person.findByIdAndRemove(id)
    }

    const getPersonsCount = async () => {
        return await Person.countDocuments({})
    }
    const findPerson = (id) => {
        return Person.findById(id)
    }
    const getPersons = () => {
        return Person.find({})
    }

    const nameExist = (name) => {
        return persons.some(person => person.name === name)
    }
    return {
        savePerson: savePerson,
        nameExist: nameExist,
        deletePerson: deletePerson,
        getPersonsCount: getPersonsCount,
        findPerson: findPerson,
        getPersons: getPersons
    }
}

module.exports = phonebookService()















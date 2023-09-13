const mongoose = require('mongoose')
const Person = require('./models/person')
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://jeskonheimo:${password}@fullstack-phonebook.tymqema.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(entry => { console.log(entry) })
        mongoose.connection.close()
    })
}
const name = process.argv[3]
const number = process.argv[4]
const person = new Person({
    name: name,
    number: number,
})

person.save().then(result => {
    console.log('phonebookEntry saved!')
    mongoose.connection.close()
})
import { useState } from 'react'
import PhonebookTable from './components/PhonebookTable'
import PhonebookNumbers from './components/PhonebookNumbers'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Header from './components/Header'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '03',
      id: window.performance.now()
    }
  ])
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const submitHandler = (event) => {
    event.preventDefault()

    const nameExist = persons.some(person => person.name === newName)

    if (nameExist) {
      window.alert(`${newName} already exists in phonebook`)
      return;
    }

    const nameObj = {
      name: newName,
      number: newNumber,
      id: window.performance.now()
    }
    setPersons(persons.concat(nameObj))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const searchChangeHandler = (event) => {
    const filteredResult = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredPersons(filteredResult)
  }
  const personFormHandlers = {
    nameChangeHandler: handleNameChange,
    numberChangeHandler: handleNumberChange,
    submitHandler: submitHandler
  }
  const personFormState = {
    newName: newName,
    newNumber: newNumber
  }

  return (
    <div>
      <Header text='Phonebook' />
      <Search onChangeHandler={searchChangeHandler} />
      <PersonForm handlers={personFormHandlers} personFormState={personFormState} />
      <PhonebookNumbers numbers={filteredPersons} />
    </div>
  )
}

export default App
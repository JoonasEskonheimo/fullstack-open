import { useState, useEffect } from 'react'
import PhonebookNumbers from './components/phonebookNumbers'
import Search from './components/search'
import PersonForm from './components/personForm'
import Header from './components/header'
import phonebookService from './services/phonebookService'

const App = () => {

  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    fetchPersons()
  }, [])

  const fetchPersons = () => {
    phonebookService.getAll().then(personsData => setPersons(personsData))
  }

  useEffect(() => {
    setFilteredPersons(persons);
  }, [persons])

  const personFormSubmitHandler = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    const nameObj = {
      name: newName,
      number: newNumber
    }
    const userWantsUpdate = () => {
      return window.confirm(`${newName} already exists in phonebook, do you want to update it?`)
    }
    if (existingPerson && userWantsUpdate()) {
      phonebookService.update(existingPerson.id, nameObj).then(updatedPerson => setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person)))
      return;
    }

    phonebookService.create(nameObj).then(resp => setPersons(persons.concat(resp)))
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
    submitHandler: personFormSubmitHandler
  }
  const personFormState = {
    newName: newName,
    newNumber: newNumber
  }
  const deleteHandler = (id) => {
    phonebookService.remove(id).then(response => setPersons(persons.filter(person => person.id !== id)))
  }
  const phonebookNumbersHandlers = {
    deleteHandler: deleteHandler
  }

  return (
    <div>
      <Header text='Phonebook' />
      <Search onChangeHandler={searchChangeHandler} />
      <PersonForm handlers={personFormHandlers} personFormState={personFormState} />
      <PhonebookNumbers handlers={phonebookNumbersHandlers} numbers={filteredPersons} />
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import PhonebookNumbers from './components/phonebookNumbers'
import Search from './components/search'
import PersonForm from './components/personForm'
import Header from './components/header'
import phonebookService from './services/phonebookService'
import SuccessNotification from './components/notifications/successNotification'
import FailureNotification from './components/notifications/failureNotification'

const App = () => {
  const DEFAUT_NOTIFICATION_VALUE = ''

  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [successNotificationMessage, setNewSuccessNotificationMessage] = useState(DEFAUT_NOTIFICATION_VALUE)
  const [failureNotificationMessage, setNewFailureNotificationMessage] = useState(DEFAUT_NOTIFICATION_VALUE)


  useEffect(() => {
    fetchPersons()
  }, [])

  const fetchPersons = () => {
    phonebookService.getAll().then(personsData => setPersons(personsData))
  }
  const resetNotifications = () => {
    setNewFailureNotificationMessage(DEFAUT_NOTIFICATION_VALUE)
    setNewSuccessNotificationMessage(DEFAUT_NOTIFICATION_VALUE)
  }

  useEffect(() => {
    setFilteredPersons(persons);
  }, [persons])

  useEffect(() => {
    if (successNotificationMessage !== DEFAUT_NOTIFICATION_VALUE) {
      setTimeout(() => setNewSuccessNotificationMessage(DEFAUT_NOTIFICATION_VALUE), 3000)
    }
  }, [successNotificationMessage])

  const personFormSubmitHandler = (event) => {
    event.preventDefault()
    resetNotifications()
  
    const existingPerson = findPersonByName(newName)
    const nameObj = { name: newName, number: newNumber }
    const update = existingPerson && userWantsUpdate(existingPerson.name)
    const create = !existingPerson

    if (create) {
      createPerson(nameObj)
        .then(addedPerson => addPersonToPhonebook(addedPerson))
        .catch(error => { setNewFailureNotificationMessage(`Failed to add ${newName}`) })
    }

    if (update) {
      updatePerson(existingPerson.id, nameObj)
        .then(updatedPerson => updatePersonInPhonebook(updatedPerson))
        .catch(error => setNewFailureNotificationMessage(`Failed to update ${newName}`))
    }
  }

  const findPersonByName = (name) => {
    return persons.find(person => person.name === name);
  }

  const userWantsUpdate = (name) => {
    return window.confirm(`${name} already exists in the phonebook, do you want to update it?`);
  }

  const updatePerson = (id, nameObj) => {
    return phonebookService.update(id, nameObj);
  }

  const updatePersonInPhonebook = (updatedPerson) => {
    setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person));
    setNewSuccessNotificationMessage(`Updated ${updatedPerson.name}`);
  }

  const handleUpdateError = (name) => {
    setNewFailureNotificationMessage(`Failed to update ${name}`);
  }

  const createPerson = (nameObj) => {
    return phonebookService.create(nameObj);
  }

  const addPersonToPhonebook = (addedPerson) => {
    setPersons(persons.concat(addedPerson))
    setNewSuccessNotificationMessage(`Added ${addedPerson.name}`);
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
    phonebookService.remove(id)
      .then(response => setPersons(persons.filter(person => person.id !== id)))
      .catch(error => {
        const failedPerson = persons.find(person => person.id === id)
        setNewFailureNotificationMessage(`Failed to remove ${failedPerson.name}. It might be already removed.`)
      })
  }
  const phonebookNumbersHandlers = {
    deleteHandler: deleteHandler
  }

  return (
    <div>
      <Header text='Phonebook' />
      <SuccessNotification message={successNotificationMessage} />
      <FailureNotification message={failureNotificationMessage} />
      <Search onChangeHandler={searchChangeHandler} />
      <PersonForm handlers={personFormHandlers} personFormState={personFormState} />
      <PhonebookNumbers handlers={phonebookNumbersHandlers} numbers={filteredPersons} />
    </div>
  )
}
{ }
export default App
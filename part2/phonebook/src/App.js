import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const showNotification = (message, isError) => {
    if (isError === true) {
      setErrorMessage(message)
    } else {
      setNotificationMessage(message)
    }
    setTimeout(() => {
      setErrorMessage(null)
      setNotificationMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find((person, index) => (person.name === newName))
    if (existingPerson !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson))
            showNotification(`Updated '${newName}'`, false)
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              showNotification(`Information of ${newName} has already been removed from server`, true)
            }
          })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          showNotification(`Added '${returnedPerson.name}'`, false)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const numbersToShow = persons.filter(person => {
    if (filterValue.length <= 0) {
      return true
    }

    return person.name.toLowerCase().includes(filterValue)
  })

  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.remove(id)
        .then(response => {
          setPersons(persons.filter(person => {
            return person.id !== id
          }))
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log(error)
      })

  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage === null ? errorMessage : notificationMessage} isError={errorMessage !== null}/>
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      {numbersToShow.map(person =>
        <Persons key={person.name}
          name={person.name}
          number={person.number}
          handleDelete={() => handleDelete(person.name, person.id)} />
      )}
    </div>
  )
}

export default App

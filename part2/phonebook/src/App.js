import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find((person, index) => (person.name === newName))) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
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

  useEffect(() => {
    console.log('effect')
  
    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    }
  
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      {numbersToShow.map(person =>
        <Persons key={person.name} name={person.name} number={person.number} />
      )}
    </div>
  )
}

export default App

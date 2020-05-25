import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'
import components from './components/phonebook.js'

const Persons = ({ persons, onClick }) => {

  return (
    <>
      <ul>
        {persons.map(person =>
          <li key={person.id}>
            {person.name} {person.number}
            <button
              value={person.id}
              onClick={onClick}>
              delete
            </button>

          </li>)}
      </ul>
    </>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input
          value={props.newPerson}
          onChange={props.handlePersonChange}
        />
      </div>
      <div>
        number: <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newList, setNewList] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorType, setErrorType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(intialPersons => {
        setPersons(intialPersons)
      })
  }, [])

  const personsToShow = showAll
    ? persons
    : newList

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber,
    }

    const personExists = persons.some(p => p.name === newPerson)
    if (personExists) {
      const result = window.confirm(`${newPerson} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        const id = persons.find(person => person.name === newPerson).id
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setErrorType('info')
        setErrorMessage(
          `Changed number of ${newPerson}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
          })
          .catch(error => {
            setErrorType('alert')
            setErrorMessage(
              `Person' ${personObject.name}' was already removed from the server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
          })

      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        setErrorType('info')
        setErrorMessage(
          `Added ${newPerson} to the phonebook`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)

    }
    setNewPerson('')
    setNewNumber('')
  }

  const deletePerson = (event) => {
    const id = parseInt(event.target.value, 10)
    const person = persons.find(person => person.id === id)
    const result = window.confirm(`Delete ${person.name}`);
    if (result) {
      personService
      .deletePerson(person.id)
      .catch(error => {
        setErrorType('alert')
            setErrorMessage(
              `Person' ${person.name}' was already removed from the server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
      })
      const index = persons.indexOf(person)
      if (index > -1) {
        setPersons(persons.filter(p => p.id !== id))
        setErrorType('info')
        setErrorMessage(`Deleted ${person.name}`)
        setTimeout(() => {
          setErrorMessage('')
        }, 2000)
      }
    }
  }

  const handlePersonChange = (event) => {
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    const filt = persons.some(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()))
    const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()))
    if (event.target.value === '') {
      setShowAll(true)
    } else if (filt) {
      setNewList(filteredPersons)
      setShowAll(false)
    } else {
      setShowAll(true)
      window.alert(`${event.target.value} is someone who doesn't exist or hasn't been added yet. Try looking for someone else`)
      setNewFilter('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <components.Notification message={errorMessage} type={errorType} />
      <components.Filter persons={persons} newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} newPerson={newPerson} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} onClick={deletePerson} />
    </div>
  )

}

export default App

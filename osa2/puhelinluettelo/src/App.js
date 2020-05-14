import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ newFilter, handleFilterChange }) => (
  <>
    filter shown with: <input
      value={newFilter}
      onChange={handleFilterChange}
    />
  </>
)


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

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
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
    //console.log(personExists)
    if (personExists) {
      window.alert(`${newPerson} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewPerson('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (event) => {
    //console.log(persons)
    const id = parseInt(event.target.value, 10)
    //console.log(id)
    const person = persons.find(person => person.id === id)
    const result = window.confirm(`Delete ${person.name}`);
    //console.log(result)
    if (result) {
      personService.deletePerson(person.id)
      const index = persons.indexOf(person)
      //console.log(index, 'täält löyty')
      if (index > -1) {
        const copyOfPersons = persons
        copyOfPersons.splice(index, 1)
        setPersons(copyOfPersons)
        window.location.reload(true);
      }
      //console.log(persons)

    }


  }

  const handlePersonChange = (event) => {
    //console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    const filt = persons.some(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()))
    const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()))
    if (event.target.value === '') {
      setShowAll(true)
    } else if (filt) {
      //console.log(`${event.target.value} matches to something`)
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

      <Filter persons={persons} newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} newPerson={newPerson} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} onClick={deletePerson} />
    </div>
  )

}

export default App

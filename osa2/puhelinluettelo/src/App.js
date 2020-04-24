import React, { useState } from 'react'

const Filter = (props) => (
  <>
    filter shown with: <input
      value={props.newFilter}
      onChange={props.handleFilterChange}
    />
  </>
)


const Persons = (props) => {
  return (
    <>
      <ul>
        {props.persons.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>)}
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newList, setNewList] = useState('')
  const [showAll, setShowAll] = useState(true)

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
    console.log(personExists)
    if (personExists) { window.alert(`${newPerson} is already added to phonebook`) }
    else { setPersons(persons.concat(personObject)) }

    setNewPerson('')
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
      console.log(`${event.target.value} matches to something`)
      setNewList(filteredPersons)
      setShowAll(false)
    } else {
      setShowAll(true)
      window.alert(`${newFilter} is someone who doesn't exist or hasn't been added yet. Try looking for someone else`)
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
      
      <Persons persons={personsToShow} />
    </div>
  )

}

export default App

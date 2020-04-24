import React, { useState } from 'react'

const Filter = (props) => {
  const [newFilter, setNewFilter ] = useState('')
  

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    const filt = props.persons.some(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()))
    if (filt && event.target.value !== '') {
      console.log(`${event.target.value} matches to something`)
    } else {
      console.log(`${event.target.value} Ei osu`)
    }
  }
  return (
    <>
      filter shown with: <input
        value = {newFilter}
        onChange = {handleFilterChange}
      />
    </>
  )
}

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


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newPerson, setNewPerson ] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber,
    }

    const personExists = persons.some(p => p.name === newPerson)
    console.log(personExists)
    if (personExists) {window.alert(`${newPerson} is already added to phonebook`)}
    else {setPersons(persons.concat(personObject))}

    
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

  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter persons={persons}/>
      </div>

      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input
           value = {newPerson}
           onChange = {handlePersonChange}
           />
        </div>
        <div>
          number: <input
          value = {newNumber}
          onChange = {handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  )

}

export default App

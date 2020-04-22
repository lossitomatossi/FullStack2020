import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newPerson, setNewPerson ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
    }

    const personExists = persons.some(p => p.name === newPerson)
    console.log(personExists)
    if (personExists) {window.alert(`${newPerson} is already added to phonebook`)}
    else {setPersons(persons.concat(personObject))}

    
    setNewPerson('')
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
           value = {newPerson}
           onChange = {handlePersonChange}
           />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map(person =>
            <li key={person.name}>{person.name}</li>)}
        </ul>
      </div>
      ...
    </div>
  )

}

export default App

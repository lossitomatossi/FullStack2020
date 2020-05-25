import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null || message === '') {
    return null
  }
  if (type === 'info') {
    return (
      <div className='info'>
        {message}
      </div>
    )
  } else {
    return (
      <div className='alert'>
        {message}
      </div>
    )
  }

}

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

export default { Notification, Filter, Persons, PersonForm }
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

export default { Notification, Filter }
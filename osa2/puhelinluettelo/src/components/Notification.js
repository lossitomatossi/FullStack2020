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

  export default Notification
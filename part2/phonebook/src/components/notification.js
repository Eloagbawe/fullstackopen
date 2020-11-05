import React from 'react'

const Notification = ({ message, propertyName }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={propertyName}>
        {message}
      </div>
    )
  }

  export default Notification;
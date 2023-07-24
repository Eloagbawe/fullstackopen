import React from 'react'
import Alert from 'react-bootstrap/Alert'

const Notification = ({ message, propertyName }) => {
  if (message === null) {
    return null
  }

  return (
    <Alert variant={propertyName} className="my-5">
      {message}
    </Alert>
  )
}

export default Notification

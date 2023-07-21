import React from 'react'
import Alert from '@mui/material/Alert'

const Notification = ({ message, propertyName }) => {
  if (message === null) {
    return null
  }

  return <Alert severity={propertyName}>{message}</Alert>
}

export default Notification

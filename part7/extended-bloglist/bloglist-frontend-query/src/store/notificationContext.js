import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'DISPLAY MESSAGE':
    return {
      message: action.payload.message,
      propertyName: action.payload.propertyName
    }

  case 'CLEAR MESSAGE':
    return {
      message: null,
      propertyName: undefined
    }

  default:
    return state
  }
}

const notificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    {
      message: null,
      propertyName: undefined
    }
  )
  return (
    <notificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </notificationContext.Provider>
  )
}

export default notificationContext

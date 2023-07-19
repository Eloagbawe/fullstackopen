import { createContext, useReducer } from 'react'

const authReducer = (state, action) => {
  switch (action.type) {
  case 'SET USER':
    return action.payload

  case 'REMOVE USER':
    return null

  default:
    return state
  }
}

const authContext = createContext()

export const AuthContextProvider = (props) => {
  const [user, userDispatch] = useReducer(
    authReducer,
    null
  )
  return <authContext.Provider value={[user, userDispatch]}>
    {props.children}
  </authContext.Provider>
}

export default authContext

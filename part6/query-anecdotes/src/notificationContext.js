import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch(action.type) {
        case 'DISPLAY MESSAGE':
            return action.payload
        
        case 'CLEAR MESSAGE':
            return ''
    
        default:
            return state
    }
    
}

const notificationContext = createContext()

export const CounterContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')
    return (
        <notificationContext.Provider value={[notification, notificationDispatch] }>
            {props.children}
        </notificationContext.Provider>
    )
}

export default notificationContext

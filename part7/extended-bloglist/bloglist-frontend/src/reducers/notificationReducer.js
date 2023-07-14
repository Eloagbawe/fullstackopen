import { createSlice } from '@reduxjs/toolkit'

export const setNotification = (message, propertyName, time) => {
  return (dispatch, getState) => {
    clearTimeout(getState().notification.timeOutId)
    const timeOutId = setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
    dispatch(addNotification({ message, timeOutId, propertyName }))
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    timeOutId: undefined,
    propertyName: undefined
  },
  reducers: {
    addNotification(state, action){
      const { message, timeOutId, propertyName } = action.payload
      return {
        message,
        timeOutId,
        propertyName
      }
    },
    removeNotification(state){
      return {
        ...state,
        message: null,
        propertyName: undefined
      }
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer

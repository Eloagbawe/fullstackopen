import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: ''
  },
  reducers: {
    addNotification(state, action){
      return {
        message: action.payload.message
      }
    }
  }
})

export const { addNotification } = notificationSlice.actions

export default notificationSlice.reducer

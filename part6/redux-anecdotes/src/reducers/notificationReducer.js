import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: '',
        display: false
    },
    reducers: {
        setNotificationMessage(state, action) {
            return {
                ...state,
                message: action.payload,
            }
        },
        setNotificationDisplay(state, action) {
            return {
                ...state,
                display: action.payload
            }
        }

    }
})

export const { setNotificationMessage, setNotificationDisplay } = notificationSlice.actions;

export default notificationSlice.reducer;

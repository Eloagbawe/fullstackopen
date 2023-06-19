import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: '',
        display: false
    },
    reducers: {
        displayNotification(state, action) {
            return {
                message: action.payload,
                display: true
            }
        },
        clearNotification(state) {
            return {
                ...state,
                display: false
            }
        }

    }
})

export const { displayNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(displayNotification(message))
        setTimeout(() => {
        dispatch(clearNotification())
        }, time * 1000);
    }
}

export default notificationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: '',
        display: false,
        timeOutId: undefined
    },
    reducers: {
        displayNotification(state, action) {
            return {
                message: action.payload.message,
                display: true,
                timeOutId: action.payload.timeOutId
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
    return (dispatch, getState) => {
        clearTimeout(getState().notification.timeOutId)
        const timeOutId = setTimeout(() => {
        dispatch(clearNotification())
        }, time * 1000);
        dispatch(displayNotification({message, timeOutId}))
    }
}

export default notificationSlice.reducer;

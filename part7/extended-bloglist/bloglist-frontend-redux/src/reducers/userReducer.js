import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    getUsers(state, action) {
      return action.payload
    },
  },
})

export const getAllUsers = () => {
  return async (dispatch) => {
    const usersData = await userService.getUsers()
    dispatch(getUsers(usersData))
    return usersData
  }
}
export const { getUsers } = userSlice.actions

export default userSlice.reducer

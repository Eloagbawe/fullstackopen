import { createSlice } from '@reduxjs/toolkit'

// export const set_filter = (filter) => {
//   return {
//     type: 'SET_FILTER',
//     payload: filter
//   }
  
// }
// const filterReducer = (state = '', action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch(action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// export default filterReducer;

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    set_filter(state, action) {
      console.log('action', action)
      return action.payload;
    }
  }

})

export const { set_filter } = filterSlice.actions;
export default filterSlice.reducer;

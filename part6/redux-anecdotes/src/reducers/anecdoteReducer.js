import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService';

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// export const addVote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

// export const addAnecdote = (content) => {
//   return {
//     type: 'ADD ANECDOTE',
//     payload: {
//       content,
//       id: getId(),
//     }
//   }
// }

// const anecdotesReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch(action.type){
//     case 'VOTE':
//       const id = action.payload.id;
//       const anecdoteToVote = state.find(anecdote => anecdote.id === id)
//       const changedAnecdote = {
//         ...anecdoteToVote,
//         votes: anecdoteToVote.votes + 1
//       }
//       return state.map(anecdote => 
//         anecdote.id !== id ? anecdote : changedAnecdote)

//     case 'ADD ANECDOTE':
//       const newAnecdote = {
//         content: action.payload.content,
//         id: action.payload.id,
//         votes: 0
//       }
//       return state.concat(newAnecdote)

//     default:
//         return state
//   }

  
// }

// export default anecdotesReducer

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      // const id = action.payload.id;
      const id = action.payload;

      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote)
    },

    addAnecdote(state, action) {
      // const newAnecdote = {
      //   content: action.payload.content,
      //   id: getId(),
      //   votes: 0
      // }
      const newAnecdote = action.payload
      return state.concat(newAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }

  }
})

export const {addVote, addAnecdote, setAnecdotes} = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const response = await anecdoteService.voteAnecdote(anecdote)
    if (response) {
      dispatch(addVote(anecdote.id))
    }
  }
}

export default anecdoteSlice.reducer;

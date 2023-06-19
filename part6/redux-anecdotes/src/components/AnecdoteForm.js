import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const add = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value;
    dispatch(createAnecdote(content))
    dispatch(setNotification(`You added a new anecdote '${content}'`, 5))
    e.target.anecdote.value = ''
  }
  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={add}>
            <div><input name="anecdote"/></div>
            <button>create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm
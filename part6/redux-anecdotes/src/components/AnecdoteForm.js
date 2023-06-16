import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationMessage, setNotificationDisplay } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const add = (e) => {
    e.preventDefault()
    dispatch(addAnecdote({content: e.target.anecdote.value}))
    dispatch(setNotificationMessage(`You added a new anecdote '${e.target.anecdote.value}'`))
    dispatch(setNotificationDisplay(true))
    e.target.anecdote.value = ''
    setTimeout(() => {
      dispatch(setNotificationDisplay(false))
    }, 5000);
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
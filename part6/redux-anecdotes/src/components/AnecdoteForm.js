import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const add = (e) => {
    e.preventDefault()
    dispatch(addAnecdote(e.target.anecdote.value))
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
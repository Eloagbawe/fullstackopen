import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotificationMessage, setNotificationDisplay } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    const stateAnecdotes = [...state.anecdotes]
    if (state.filter === '') {
      return stateAnecdotes.sort(function(a, b) {return b.votes - a.votes})
    }
    return stateAnecdotes.filter(anecdotes => anecdotes.content.includes(state.filter))
   
  })

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(addVote({id}))
    dispatch(setNotificationMessage(`You voted '${content}'`))
    dispatch(setNotificationDisplay(true))
    
    setTimeout(() => {
      dispatch(setNotificationDisplay(false))
    }, 5000);
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
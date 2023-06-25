import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import notificationContext from '../notificationContext'

const AnecdoteForm = () => {
  const [, notificationDispatch] = useContext(notificationContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote,
    {
      onSuccess: (newAnecdote) => {
        // queryClient.invalidateQueries('anecdotes')
        notificationDispatch({type: 'DISPLAY MESSAGE', 
        payload: `A new Anecdote '${newAnecdote.content}' was added`})
        setTimeout(() => {
          notificationDispatch({type: 'CLEAR MESSAGE'})
        }, 5000)
        const anecdotes = queryClient.getQueryData('anecdotes')
        queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      },
      onError: (err) => {
        let errMessage;
        err?.response?.data?.error ? 
        errMessage = err?.response?.data?.error:
        errMessage = 'An error occurred'
        notificationDispatch({type: 'DISPLAY MESSAGE', 
        payload: errMessage})
        setTimeout(() => {
          notificationDispatch({type: 'CLEAR MESSAGE'})
        }, 5000)
      }
    })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

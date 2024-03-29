import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'
import notificationContext from './notificationContext'

const App = () => {
  const [, notificationDispatch] = useContext(notificationContext)

  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    console.log('vote')
    updateAnecdoteMutation.mutate(updatedAnecdote)
    notificationDispatch({type: 'DISPLAY MESSAGE', 
    payload: `anecdote '${anecdote.content}' was voted`})
    setTimeout(() => {
      notificationDispatch({type: 'CLEAR MESSAGE'})
    }, 5000)
  }

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: 1,
    refetchOnWindowFocus: false
  })
  // console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError && result.error.code === 'ERR_NETWORK') {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data;
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

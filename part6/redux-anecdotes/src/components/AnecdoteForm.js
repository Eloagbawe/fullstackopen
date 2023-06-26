import React from 'react'
// import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()
  const add = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value;
    // dispatch(createAnecdote(content))
    // dispatch(setNotification(`You added a new anecdote '${content}'`, 5))
    props.createAnecdote(content)
    props.setNotification(`You added a new anecdote '${content}'`, 5)
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

// export default AnecdoteForm

const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: value => {
      dispatch(createAnecdote(value))
    },
    setNotification: (message, time) => {
      dispatch(setNotification(message, time))
    }
  }
}

// export default connect(null, {createAnecdote, setNotification})(AnecdoteForm)
export default connect(null, mapDispatchToProps)(AnecdoteForm)

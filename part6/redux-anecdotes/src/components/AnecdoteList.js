import React from 'react'
// import { useSelector, useDispatch, connect } from 'react-redux'
import { connect } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  // const dispatch = useDispatch()
  // const anecdotes = useSelector(state => {
  //   const stateAnecdotes = [...state.anecdotes]
  //   if (state.filter === '') {
  //     return stateAnecdotes.sort(function(a, b) {return b.votes - a.votes})
  //   }
  //   return stateAnecdotes.filter(anecdotes => anecdotes.content.includes(state.filter))
   
  // })
  // const anecdotesToShow = () => {
  //   const stateAnecdotes = [...props.anecdotes]
  //   if (props.filter === '') {
  //     return stateAnecdotes.sort(function(a, b) {return b.votes - a.votes})
  //   }
  //   return stateAnecdotes.filter(anecdotes => anecdotes.content.includes(props.filter))
   
  // }

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    // dispatch(voteAnecdote(anecdote));
    // dispatch(setNotification(`You voted '${anecdote.content}'`, 5));
    props.voteAnecdote(anecdote)
    props.setNotification(`You voted '${anecdote.content}'`, 5);

  }
  return (
    <div>
      {/* {anecdotes.map(anecdote => */}
      {/* {anecdotesToShow().map(anecdote => */}
      {props.anecdotes.map(anecdote =>


        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     anecdotes: state.anecdotes,
//     filter: state.filter,
//   }
// }

const mapStateToProps = (state) => {
  const stateAnecdotes = [...state.anecdotes]
  if (state.filter === '') {
    return { 
      anecdotes: stateAnecdotes.sort(function(a, b) {return b.votes - a.votes})}
  }
  return { 
    anecdotes: stateAnecdotes.filter(anecdotes => anecdotes.content.includes(state.filter))
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
// export default AnecdoteList
export default ConnectedAnecdotes

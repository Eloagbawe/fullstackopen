import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const DisplayMaxVote = (props) => {
  
  return(
    <div>
      <p>{props.anecdotes[props.maxIndex]}</p>
      <p>This has {props.maxVote} votes</p>
    </div>
  )
}
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote,setVote] = useState(props.votes)
  const [maxVote,setMaxVote] = useState(Math.max(...vote))
  const maxIndex = vote.indexOf(maxVote)
  const randomNum = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }
 
  const updateVote = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
  }
  
  const updateMaxVote = () => {
    setMaxVote(Math.max(...vote)) 
    
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>This has {vote[selected]} votes</p>
      <button onClick = {updateVote}>Vote</button> 
      <button onClick={() => {randomNum(); updateMaxVote();}}>Next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <DisplayMaxVote anecdotes={props.anecdotes} maxIndex = {maxIndex} maxVote = {maxVote}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const votes = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0);

ReactDOM.render(
  <App anecdotes={anecdotes} votes={votes}/>,
  document.getElementById('root')
)

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} votes={votes}/>
  </React.StrictMode>,
  document.getElementById('root')
);



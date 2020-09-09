import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const App = () => {
  const course = 'Half Stack application development'
  const exercises = {
    exercises1:10,
    exercises2:7,
    exercises3:14
  }
  const parts = {
    part1:'Fundamentals of React',
    part2:'Using props to pass data',
    part3:'State of a component'
  }
  const total = exercises.exercises1 + exercises.exercises2 + exercises.exercises3;
  
  const Header = (props) =>{
    return(
    <div>
    <h1>{props.course}</h1>
    </div>
    )
  }

  const Part = (props) =>{
    return(
      <div>
        <p>{props.part} {props.exercise}</p>
      </div>
    )
  }

  const Content = (props) =>{
    return(
      <div>
        <Part part = {props.parts.part1} exercise = {props.exercises.exercises1} />
        <Part part = {props.parts.part2} exercise = {props.exercises.exercises2} />
        <Part part = {props.parts.part3} exercise = {props.exercises.exercises3} />
      </div>
      
    )
  }
  const Total = (props) =>{
    return(
      <div>
        <p>Number of exercises {props.total}</p>
      </div>
    )
  }

  return (
    <div>
      <Header course = {course} />
      <Content parts = {parts} exercises = {exercises}/>
      <Total  total = {total}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
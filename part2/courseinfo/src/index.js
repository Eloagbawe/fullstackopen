import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Header = (props) =>{
  return(
  <div>
  <h1>{props.course.name}</h1>
  </div>
  )
}


const Part = (props) =>{
  return(
    <div>
     {props.parts.map(part => <p key = {part.id}>{part.name} {part.exercises} </p>)}
    </div>
  )
}

const Content = (props) =>{
  return(
    <div>
      <Part parts = {props.parts} />
    </div>
    
  )
}

const Total = (props) =>{
  let exerciseArr = [];
  props.parts.map(part => exerciseArr.push(part.exercises));
  return(
    <div>
      <p>total of {exerciseArr.reduce((total,current) => total + current)} exercises</p> 
    </div>
  )
}

const Course = (props) =>{
  return(
    <div>
      <Header course = {props.course} />
      <Content parts = {props.course.parts}/>
      <Total  parts = {props.course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



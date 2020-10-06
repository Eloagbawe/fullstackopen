import React from 'react';


const Header = ({course}) =>{
    return(
    <div>
    <h2>{course.name}</h2>
    </div>
    )
  }
  
  
  const Part = ({parts}) =>{
    return(
      <div>
       {parts.map(part => <p key = {part.id}>{part.name} {part.exercises} </p>)}
      </div>
    )
  }
  
  const Content = ({parts}) =>{
    return(
      <div>
        <Part parts = {parts} />
      </div>
      
    )
  }
  
  const Total = ({parts}) =>{
    return(
      <div>
        <p>total of {parts.reduce((total,current) => total + current.exercises,0)} exercises</p> 
      </div>
    )
  }
  
  const Course = ({course}) =>{
    return(
      <div>
        {course.map(course => <div key = {course.id}>
        <Header course = {course} />
        <Content parts = {course.parts}/>
        <Total  parts = {course.parts} /></div>)}
        </div>
    )
  }

  export default Course;
import React, { useState } from 'react';
import './App.css';
import Person from './components/person.js'



const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('...a new name')

  const handleNameChange = (event) => {
        setNewName(event.target.value)
  }
  
  const addName = (event) => {
    event.preventDefault()
    
    persons.forEach(person => {
      if (person.name === newName){
        alert(`${newName} is already added to phonebook`)
        
        
      }
    })
        
    const nameObject = {
      name: newName
    } 
      setPersons(persons.concat(nameObject))
       setNewName('')
  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}


export default App;

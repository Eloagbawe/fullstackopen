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
    
    const nameObject = {
      name: newName
    }  

    for (var x in persons){
      if (persons[x].name === newName){
        alert(`${newName} is already added to phonebook`)
      }
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

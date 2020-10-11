import React, { useState } from 'react';
import './App.css';
import Person from './components/person.js'



const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }

  ]) 
  const [ newName, setNewName ] = useState('...a new name')
  const [ newNumber, setNewNumber ] = useState('...a new number')

  const handleNameChange = (event) => {
        setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
        setNewNumber(event.target.value)
  }
  
  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }

    const isPresent = persons.find(person => person.name === newName)

    if(newNumber === '...a new number' || newNumber === ''){
      alert('Please Enter a phone number')
    }
    else if (isPresent){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with <input />
        </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
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

import React, { useState } from 'react';
import './App.css';
import Person from './components/person.js'



const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Aya Lovelace', number: '39-44-5323523' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Ariana Jones', number: '99-43-7383821' },
    { name: 'Beatrice Martins', number: '29-54-6122583' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Calvin Williams', number: '79-90-8423223' },
    { name: 'David Holmes', number: '039-24-1587234' },
    { name: 'Candace Ceasar', number: '39-78-0921121' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }

  ]) 
  const [ newName, setNewName ] = useState('...a new name')
  const [ newNumber, setNewNumber ] = useState('...a new number')
  const [ filter, setFilter] = useState('')
  const [ filteredNames, setFilteredNames] = useState(persons)

  const handleNameChange = (event) => {
        setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
        setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) =>{
        setFilter(event.target.value)
        const regex = new RegExp(`^${event.target.value}`,"i")
        setFilteredNames(persons.filter(person => regex.test(person.name)))
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
          filter shown with <input value = {filter} onChange={handleFilterChange}/>
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
        {/* {persons.map(person => 
          <Person key={person.name} person={person} />
        )} */}
        {filteredNames.map(person => 
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}


export default App;

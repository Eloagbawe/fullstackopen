import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Persons from './components/persons.js';
import Filter from './components/filter.js';
import PersonForm from './components/personForm.js';



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ filter, setFilter ] = useState('')
  const [ filteredNames, setFilteredNames ] = useState([])
  const [ newName, setNewName ] = useState('...a new name')
  const [ newNumber, setNewNumber ] = useState('...a new number')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredNames(response.data)
      })
  }, [])
  

  const handleNameChange = (event) => {
        setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
        setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
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
    if ((newNumber === '...a new number' || newNumber === '') && (newName === '...a new name' || newName === '')){
      alert('Please Enter a valid name and phone number')
    }
    else if (newName === '...a new name' || newName === ''){
      alert('Please Enter a valid name')
    }
    else if (newNumber === '...a new number' || newNumber === ''){
      alert('Please Enter a phone number')
    }
    else if (isPresent){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(nameObject))
      setFilteredNames(persons.concat(nameObject))
      setFilter('')
      setNewName('')
      setNewNumber('')
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} handleFilterChange = {handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addName = {addName} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons filteredNames = {filteredNames}/>
    </div>
  )
}


export default App;

import React, { useState } from 'react';
import './App.css';
import Persons from './components/persons.js'
import Filter from './components/filter.js'
import PersonForm from './components/personForm.js'



const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ariana Jones', number: '99-43-7383821' },
    { name: 'Beatrice Martins', number: '29-54-6122583' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Calvin Williams', number: '79-90-8423223' },
    { name: 'David Holmes', number: '039-24-1587234' },
    { name: 'Alice Dakota', number: '231-66-8572' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Candace Ceasar', number: '39-78-0921121' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }

  ]) 
  const [ filter, setFilter ] = useState('')
  const [ filteredNames, setFilteredNames ] = useState(persons)
  const [ newName, setNewName ] = useState('...a new name')
  const [ newNumber, setNewNumber ] = useState('...a new number')
  

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

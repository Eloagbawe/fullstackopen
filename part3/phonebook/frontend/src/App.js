import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css'
import Persons from './components/persons.js';
import Filter from './components/filter.js';
import PersonForm from './components/personForm.js';
import personService from './services/persons.js';
import Notification from './components/notification.js';



const App = () => {

  const [ persons, setPersons ] = useState([]) 
  const [ filter, setFilter ] = useState('')
  const [ filteredNames, setFilteredNames ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ message, setMessage ] = useState(null) 
  const [ propertyName, setPropertyName ] = useState('')

  //Request to get data from the server
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      setFilteredNames(initialPersons)
    })
    .catch(err => console.log(err))
  },[])
  
  //Function to handle changes in the name input
  const handleNameChange = (event) => {
        setNewName(event.target.value)
  }

  //Function to handle changes in the number input
  const handleNumberChange = (event) =>{
        setNewNumber(event.target.value)
  }
  
  //Function to handle changes in the filter input
  const handleFilterChange = (event) => {
    setFilter(event.target.value)

    //Getting the regex pattern to filter the search
    const regex = new RegExp(`${event.target.value}`,"i")

    //Setting filteredNames to entries that match the search
    setFilteredNames(persons.filter(person => regex.test(person.name)))
}

  //Function to add an entry
  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
    
    //Checking if new entry is already in the phonebook
    const foundName = persons.find(person => person.name === newName)

    if ((newNumber === '') && (newName === '')){
      alert('Please Enter a valid name and phone number')
    }
    else if (newName === ''){
      alert('Please Enter a valid name')
    }
    else if (newNumber === ''){
      alert('Please Enter a phone number')
    }
    else if (foundName){

      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)){
        
        const changedName = {...foundName, number: newNumber}
        
        //Request to update a person's number if name is already in phonebook
        personService
        .update(foundName.id, changedName)
        .then(returnedName => {
          setMessage(`Changed ${newName}'s number`)
          setPropertyName('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.map(person => person.id !== foundName.id ? person : returnedName))
          setFilteredNames(filteredNames.map(name => name.id !== foundName.id ? name : returnedName))
        })
        .catch(err => {
          console.log(err.response.data.error)
          setMessage(`${err.response.data.error}`)
          setPropertyName('fail')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      })
      }
        setNewName('')
        setNewNumber('')
    } 
    
    
    else {
      
      //Request to create a new entry
      personService
      .create(personObject)
      .then(returnedPersonObject => {
        setMessage(`Added ${newName}`)
        setPropertyName('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        setPersons(persons.concat(returnedPersonObject))
        setFilteredNames(persons.concat(returnedPersonObject))
      })
      .catch(err => {
        setMessage(`${err.response.data.error}`)
        setPropertyName('fail')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        console.log(err.response.data.error)
      })
      setFilter('')
      setNewName('')
      setNewNumber('')
    } 
  }
  
  //Function to delete an entry
  const deleteName = (id) => {

    const personObject = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${personObject.name} ?`)){

      //Request to delete an entry from the phonebook
      personService
      .deleteId(id) 
      .then(res => {
        setMessage(`Deleted ${personObject.name}`)
          setPropertyName('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      })
      .catch(err => {
        setMessage(`Information of ${personObject.name} has already been removed from server`)
        setPropertyName('fail')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
          setPersons(persons.filter(person => person.id !== id))
          setFilteredNames(filteredNames.filter(name => name.id !== id))
    }
    }
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {message} propertyName = {propertyName}/>
      <Filter filter = {filter} handleFilterChange = {handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addName = {addName} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons filteredNames = {filteredNames}  deleteName = {deleteName}/>
    </div>
  )
}


export default App;

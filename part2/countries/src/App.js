import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components//countries.js'
import './App.css';


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ filteredCountries, setFilteredCountries ] = useState([])
 

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setFilter(event.target.value)
    if (event.target.value !== ''){
    const regex = new RegExp(`^${event.target.value}`,"i")
    setFilteredCountries(countries.filter(country => regex.test(country.name)))
    }
    else { 
      setFilteredCountries([])
    }
  }
  
  return (
    <div>
      find countries <input value = {filter} onChange={handleSearch}/>
     <Countries filteredCountries = {filteredCountries}/>
    </div>
  );
}

export default App;

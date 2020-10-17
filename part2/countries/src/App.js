import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
 

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) =>{
    setFilter(event.target.value)
    const regex = new RegExp(`^${event.target.value}`,"i")
    setFilteredCountries(countries.filter(country => regex.test(country.name)))
  }
  return (
    <div>
      find countries <input value = {filter} onChange={handleSearch}/>
     <div>{filteredCountries.map(country => <li key = {country.name}>{country.name}</li>)}</div>
    </div>
  );
}

export default App;

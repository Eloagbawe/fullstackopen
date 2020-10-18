import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';


const Search = ({filteredCountries}) =>{
  return(
    <div>{filteredCountries.map(country => {
      if (filteredCountries.length > 10){
        return <p key={country.name}>Too many matches, specify another filter</p>
      }
      if (filteredCountries.length === 1){
       return <div key = {country.name}>
         <h1>{country.name}</h1>
         <p>Capital {country.capital}</p>
         <p>Population {country.population}</p>
         <h2>Languages</h2>
         <ul>{country.languages.map(language => <li key = {language.name}>{language.name}</li>)}</ul>
         <img src = {country.flag} alt = "" width = '400px' height ='200px'></img>
       </div>
       
     } 
     else {
        return <p key = {country.name}>{country.name}</p>
     }
     })
     }
    </div>
  )
}

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
     <Search filteredCountries = {filteredCountries}/>
    </div>
  );
}

export default App;

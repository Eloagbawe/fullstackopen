import React, { useState, useEffect } from 'react';
import axios from 'axios'
import FilterInput from './components/filterInput.js'
import CountryDetails from './components/countryDetails.js'
import FilteredMatch from './components/filteredMatch.js'
import './App.css';


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ filteredCountries, setFilteredCountries ] = useState('')
  
  
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
        const regex = new RegExp(`${event.target.value}`,"i")
        const search = countries.filter(country => regex.test(country.name))

        const show = (country) => {
              setFilteredCountries(<div key = {country.name}>
                <CountryDetails  country = {country}/>
                <div><button onClick = {back}>Back</button></div>
                </div>
          )
        }

        const back = () => {
          setFilteredCountries(search.map(country => { 
            return <p key = {country.name}>{country.name} <button onClick={() => show(country)
            }>Show</button></p>
          })) 
        }
        
        if (search.length === 1) {
          setFilteredCountries(search.map(country => {
              return <div key = {country.name}>
                 <CountryDetails country = {country}/>
              </div>
          })) 
        }
          
        else if (search.length === 0){
          setFilteredCountries(<p>Sorry nothing matches your search, try another input</p>)
        }

        else if (search.length <= 10){
          setFilteredCountries(search.map(country => { 
            return <p key = {country.name}>{country.name} <button onClick={() => show(country)
            }>Show</button></p>
          })) 
        }

        else {
          setFilteredCountries(<p>Too many matches, specify another filter</p>)
        }     
      }

      else { 
        setFilteredCountries('')
      } 
  }
  
  return (
    <div>
      <FilterInput filter = {filter} handleSearch = {handleSearch}/>
      <FilteredMatch filteredCountries = {filteredCountries} />
    </div>
  )
}

export default App;

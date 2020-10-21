import React, { useState, useEffect } from 'react';
import axios from 'axios'
import CountryDetails from './components/countryDetails.js'
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
        
        const back = () => {
          setFilteredCountries(search.map(country =>{
            return <p key = {country.name}>{country.name} <button onClick={() => 
              setFilteredCountries(
                <div key = {country.name}>
                <CountryDetails  country = {country}/>
                <div>
                  <button onClick={back}>Back</button>
                  </div>
                </div>
              )
            }>Show</button></p>
          }))
        }  
  
          if (search.length > 10){
            setFilteredCountries(<p>Too many matches, specify another filter</p>)
          }
          else {
            setFilteredCountries(search.map(country => {
              if (search.length === 1){
                return <div key = {country.name} >
                   <CountryDetails country = {country} />
                </div>
              } 
              else {
                return <p key = {country.name}>{country.name}<button onClick={() => 
                  setFilteredCountries(
                    <div key = {country.name}>
                    <CountryDetails  country = {country}/>
                    <div>
                      <button onClick={back}>Back</button>
                    </div>
                    </div>
                  )
                }>Show</button></p>
              }
            }))
          }
      }
      else { 
        setFilteredCountries('')
      } 
  }
  
  return (
    <div>
      find countries <input value = {filter} onChange={handleSearch}/>
     {filteredCountries}
    </div>
  );
}

export default App;

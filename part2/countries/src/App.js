import React, { useState, useEffect } from 'react';
import axios from 'axios'
import dotenv from 'dotenv'
import CountryDetails from './components/countryDetails.js'

import './App.css';

dotenv.config();
const accessKey = process.env.ACCESS_KEY


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ filteredCountries, setFilteredCountries ] = useState('')
  const [ capital, setCapital] = useState('New York')
  const [ weatherDetails, setWeatherDetails ] = useState([])
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  console.log(accessKey)
  
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${accessKey}`)
      .then(response => {
        setWeatherDetails(response.data)
        
      })
  }, [])
  console.log(weatherDetails)
  const handleSearch = (event) => {
    setFilter(event.target.value)
      if (event.target.value !== ''){
        const regex = new RegExp(`${event.target.value}`,"i")
        const search = countries.filter(country => regex.test(country.name))
        
        const back = () => {
          setFilteredCountries(search.map(country =>{
            return <p key = {country.name}>{country.name} <button onClick={() => {
              // const cap = country.capital
              // setCapital(cap)
              // console.log(country.capital)
              // console.log(capital)
              
              setFilteredCountries(
                <div key = {country.name}>
                <CountryDetails  country = {country} weather = {weatherDetails}/>
                <div>
                  <button onClick={back}>Back</button>
                  </div>
                </div>
              )
            }}>Show</button></p>
          }))
        }  
  
          if (search.length > 10){
            setFilteredCountries(<p>Too many matches, specify another filter</p>)
          }
          else {
            setFilteredCountries(search.map(country => {
              if (search.length === 1){
                // const cap = country.capital
                // setCapital(cap)
                // console.log(country.capital)
                // console.log(capital)
                return <div key = {country.name}>
                   <CountryDetails country = {country} weather = {weatherDetails}/>
                </div>
              } 
              else {
                return <p key = {country.name}>{country.name}<button onClick={() => {
                  // const cap = country.capital
                  // setCapital(cap)
                  // console.log(country.capital)
                  // console.log(capital)
                  setFilteredCountries(
                    <div key = {country.name}>
                    <CountryDetails  country = {country} weather = {weatherDetails}/>
                    <div>
                      <button onClick={back}>Back</button>
                    </div>
                    </div>
                  )
                }}>Show</button></p>
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

import React, { useState, useEffect } from 'react';
import axios from 'axios'
import CountryDetails from './components/countryDetails.js'
import WeatherDetails from './components/weatherDetails.js'
import './App.css';


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ filteredCountries, setFilteredCountries ] = useState('')
  const [ capital, setCapital ] = useState('New York')
  const [ filteredArr, setFilteredArr ] = useState([])

  const [ weatherDetails, setWeatherDetails ] = useState([])
  const accessKey = process.env.REACT_APP_ACCESS_KEY
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${accessKey}`)
      .then(response => {
        setWeatherDetails(response.data)
      })
  }, [capital,accessKey])

  const handleSearch = (event) => {
    setFilter(event.target.value)
      if (event.target.value !== ''){
        const regex = new RegExp(`${event.target.value}`,"i")
        const search = countries.filter(country => regex.test(country.name))
        
        const back = () => {
          setFilteredArr([])
          setFilteredCountries(search.map(country => { 
            return <p key = {country.name}>{country.name} <button onClick={() =>{
              setCapital(country.capital)
              setFilteredArr(filteredArr.concat(country.name))
              setFilteredCountries(<div key = {country.name}>
                <CountryDetails  country = {country}/>
                {/* <WeatherDetails weather = {country.capital}/> */}
                <div>
                  <button onClick={back}>Back</button>
                  </div>
                </div>
                )
            }}>Show</button></p>
          }))
        }  
          

        if (search.length === 1) {
          search.map(country => {
            return setCapital(country.capital)
          })
          search.map(country => {
            return setFilteredArr(filteredArr.concat(country.name))
          })
          setFilteredCountries(search.map(country => {
              return <div key = {country.name}>
                 <CountryDetails country = {country}/>
                 {/* <WeatherDetails weather = {country.capital}/> */}
              </div>
          }))
          
        }
          

        else if (search.length <= 10){
          setFilteredCountries(search.map(country => { 
            return <p key = {country.name}>{country.name} <button onClick={() =>{
              setCapital(country.capital)
              setFilteredArr(filteredArr.concat(country.name))
              setFilteredCountries(<div key = {country.name}>
                <CountryDetails  country = {country}/>
                {/* <WeatherDetails weather = {country.capital}/> */}
                <div>
                  <button onClick={back}>Back</button>
                </div>
                </div>
              )

            }}>Show</button></p>
          }))
          
        }

        else {
          setFilteredCountries(<p>Too many matches, specify another filter</p>)
          setFilteredArr([])
        }
             
      }

      else { 

        setFilteredCountries('')
        setFilteredArr([])
        
      } 
  }
  
  return (
    <div>
      find countries <input value = {filter} onChange={handleSearch}/>
     {filteredCountries}
     <WeatherDetails capital = {capital} weather = {weatherDetails} filteredCountries = {filteredArr}/>
    </div>
  )
}

export default App;

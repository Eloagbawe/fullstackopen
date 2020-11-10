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
  
  //Request to get data for various countries from the API
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  
  //Function to handle country search
  const handleSearch = (event) => {
    setFilter(event.target.value)

      //If input field is not empty, the output of the search is rendered conditionally

      if (event.target.value !== ''){

        //Getting the regex pattern to filter the search
        const regex = new RegExp(`${event.target.value}`,"i")

        //Storing the countries that match the search in an array
        const search = countries.filter(country => regex.test(country.name))

        //Function to show the details of a country
        const show = (country) => {
              setFilteredCountries(<div key = {country.name}>
                <CountryDetails  country = {country}/>
                <div><button onClick = {back}>Back</button></div>
                </div>
          )
        }

        //Function to navigate from the details of a country back to the list of countries
        const back = () => {
          setFilteredCountries(search.map(country => { 
            return <p key = {country.name}>{country.name} <button onClick={() => show(country)
            }>Show</button></p>
          })) 
        }
        

        //If no country matches the query, then the user is prompted to try another input
        if (search.length === 0){
          setFilteredCountries(<p>Sorry nothing matches your search, try another input</p>)
        }
        
        //When there is only one country matching the query, then the details of the country are shown
        else if (search.length === 1) {
          setFilteredCountries(search.map(country => {
              return <div key = {country.name}>
                 <CountryDetails country = {country}/>
              </div>
          })) 
        }
        
        //If there are ten or fewer countries, but more than one, then all countries matching the query are shown
        else if (search.length <= 10){
          setFilteredCountries(search.map(country => { 
            return <p key = {country.name}>{country.name} <button onClick={() => show(country)
            }>Show</button></p>
          })) 
        }
        
        //If there are too many (over 10) countries that match the query, then the user is prompted to make their query more specific
        else {
          setFilteredCountries(<p>Too many matches, specify another filter</p>)
        }     
      }
      
      //If input field is empty, nothing is rendered
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

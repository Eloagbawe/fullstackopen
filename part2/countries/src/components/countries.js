import React from 'react';

const Countries = ({filteredCountries}) =>{
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
  export default Countries;
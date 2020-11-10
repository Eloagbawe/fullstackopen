import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CountryDetails = ({country}) => {
    const [ weatherDetails, setWeatherDetails ] = useState({})
    const accessKey = process.env.REACT_APP_ACCESS_KEY



    useEffect(() => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=${accessKey}&query=${country.capital}`)
          .then(response => {
            setWeatherDetails(response.data.current)
          })
      }, [country, accessKey])

    return (
        <div>
                <h1>{country.name}</h1>
                <p>Capital {country.capital}</p>
                <p>Population {country.population}</p>
                <h2>Spoken Languages</h2>
                <ul>{country.languages.map(language => <li key = {language.name}>{language.name}</li>)}</ul>
                <img src = {country.flag} alt = "" width = '300px' height ='150px'></img>
                <h2>Weather in {country.capital}</h2>
                <p>temperature: {weatherDetails.temperature} Celsius</p>
                <img src = {weatherDetails.weather_icons} alt = {weatherDetails.weather_descriptions} width = '100px' height ='50px'></img>
                <p>wind: {weatherDetails.wind_speed} mph  direction {weatherDetails.wind_dir}</p>
                </div>
    )
}

export default CountryDetails;
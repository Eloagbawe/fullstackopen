import React from 'react';

const CountryDetails = ({country, weather}) =>{
    return (
        <div>
                <h1>{country.name}</h1>
                <p>Capital {country.capital}</p>
                <p>Population {country.population}</p>
                <h2>Spoken Languages</h2>
                <ul>{country.languages.map(language => <li key = {language.name}>{language.name}</li>)}</ul>
                <img src = {country.flag} alt = "" width = '400px' height ='200px'></img>
                <h2>Weather in {country.capital}</h2>
                <p>temperature: {weather.temperature} Celsius</p>
                <img src = {weather.weather_icons[0]} alt = {weather.weather_icons[1]} width = '400px' height ='200px'></img>
                <p>wind: {weather.wind_speed} m/s direction {weather.wind_dir}</p>
                </div>
    )
}

export default CountryDetails;
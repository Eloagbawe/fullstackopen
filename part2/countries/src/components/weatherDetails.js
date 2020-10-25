import React from 'react';


const WeatherDetails = ({capital,weather,filteredCountries}) => {
    if (filteredCountries.length === 1){
    return (
        <div>
           <h2>Weather in {capital}</h2>
                <p>temperature: {weather.main.temp - 273.15} Celsius</p>
                <p>description: {weather.weather[0].description}</p>
                {/* <img src = {weather.weather_icons[0]} alt = {weather.weather_icons[1]} width = '400px' height ='200px'></img> */}
                <p>wind: {weather.wind.speed} m/s {weather.wind.deg} degrees</p>
        </div>
    )
  }
  else {
      return null
  }
}
export default WeatherDetails;
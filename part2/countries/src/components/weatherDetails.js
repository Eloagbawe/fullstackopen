import React from 'react';


const WeatherDetails = ({capital,weatherDetails,filteredArr}) => {
    if (filteredArr.length === 1){
    return (
        <div>
                <h2>Weather in {capital}</h2>
                <p>temperature: {weatherDetails.current.temperature} Celsius</p>
                <img src = {weatherDetails.current.weather_icons[0]} alt = {weatherDetails.current.weather_icons[1]} width = '100px' height ='50px'></img>
                <p>wind: {weatherDetails.current.wind_speed} mph  direction {weatherDetails.current.wind_dir}</p>
        </div>
    )
  }
  else {
      return null
  }
}
export default WeatherDetails;
import React from 'react';


const WeatherDetails = ({weather}) =>{
    return (
        <div>
           <h2>Weather in {weather}</h2>
                {/* <p>temperature: {weather.main.temp} Celsius</p>
                <img src = {weather.weather_icons[0]} alt = {weather.weather_icons[1]} width = '400px' height ='200px'></img>
                <p>wind: {weather.wind.speed} m/s {weather.wind.deg} degrees</p> */}
                <p>Checking if {weather} is working</p>
        </div>
    )
}
export default WeatherDetails;
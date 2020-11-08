import React from 'react';
import WeatherDetails from './weatherDetails.js'

const FilteredMatch = ({filteredCountries, capital, weatherDetails, filteredArr}) => {
    return (
        <div>
            <div>{filteredCountries}</div>
            <WeatherDetails capital = {capital} weatherDetails = {weatherDetails} filteredArr = {filteredArr}/>
        </div>
    )
}

export default FilteredMatch;
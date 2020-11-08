import React from 'react';



const CountryDetails = ({country}) => {
    return (
        <div>
                <h1>{country.name}</h1>
                <p>Capital {country.capital}</p>
                <p>Population {country.population}</p>
                <h2>Spoken Languages</h2>
                <ul>{country.languages.map(language => <li key = {language.name}>{language.name}</li>)}</ul>
                <img src = {country.flag} alt = "" width = '300px' height ='150px'></img>
                </div>
    )
}

export default CountryDetails;
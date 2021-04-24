import React from 'react'

const Details = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {
                    country.languages.map(language =>
                        <li key={language.name}>{language.name}</li>
                    )
                }
            </ul>
            <img width="25%" height="25%" src={country.flag} alt={`the flag from ${country.name}`} />
        </div>
    )
}

export default Details
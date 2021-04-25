import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Details = ({ country }) => {
    const [weather, setWeather] = useState(undefined)
    const reqUrl = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.name}`

    useEffect(() => {
        const eventHandler = response => {
            setWeather(response.data)
        }

        const promise = axios.get(reqUrl)
        promise.then(eventHandler)
    }, [reqUrl])

    const showWeather = (weather !== undefined) && (weather.current !== undefined)
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
            {
                showWeather ?
                    <div>
                        <h2>Weather in {country.name}</h2>
                        <p>temperature: {weather.current.temperature}</p>
                        <img width="25%" height="25%" src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} />
                        <p>wind: {weather.current.wind_speed} direction {weather.current.wind_dir}</p>
                    </div>
                    : <p>Loading weather info...</p>
            }
        </div>
    )
}

export default Details
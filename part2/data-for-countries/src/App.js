import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Details from './components/Details'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterValue, setNewFilter] = useState('')

  useEffect(() => {
    const eventHandler = response => {
      setCountries(response.data)
    }

    const promise = axios.get('https://restcountries.eu/rest/v2/all')
    promise.then(eventHandler)
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => {
    if (filterValue.length <= 0) {
      return true
    }

    return country.name.toLowerCase().includes(filterValue)
  })

  const tooMany = countriesToShow.length > 10
  const showDetails = countriesToShow.length === 1
  return (
    <div>
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />
      <div>
        {
          tooMany ? (
            <p>Too many matches, specify another filter</p>
          ) : (
            showDetails ?
              <Details key={countriesToShow[0].name} country={countriesToShow[0]} /> :
              countriesToShow.map(country =>
                <Country key={country.name} name={country.name} />
              )
          )
        }
      </div>
    </div>
  )
}

export default App

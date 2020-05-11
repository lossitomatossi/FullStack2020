import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, handleFilterChange}) => (
  <>
    find countries: <input
      value={filter}
      onChange={handleFilterChange}
    />
  </>
)

const Countries = ({countries, onClick}) => (
    <>
      <h2>Countries</h2>
      <ul>
        {countries.map(country =>
          <li key={country.name}>
            {country.name}
            <button
              value={country.name}
              onClick={onClick}
            >
              show
            </button>
          </li>)}
      </ul>
    </>
  )


const Country = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState('')
  const url= `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
  }, [url])

  return (
    <>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}> {language.name} </li>)}
      </ul>
      <img
        src={country.flag}
        alt={country.name}
        height='200'
      />
      <h3>Weather in {country.capital}</h3>
      <Weather weather={weather.current} />

    </>
  )
}

const Weather = ({weather}) => {
  if (weather === undefined || weather === '') {
    return (
      <>
        <p>temperature data missing</p>
      </>
    )
  } else {
    return (
      <>
        <p><b>temperature:</b> {weather.temperature} Celsius</p>
        <img
          src={weather.weather_icons}
          alt={weather.weather_descriptions}
        />
        <p><b>wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}</p>
        
      </>
    )
  }
}

const ShowCountries = ({countries, onClick}) => {
  if (countries.length > 10) {
    return (
      <>
        <p>too many matches, specify another filter</p>
      </>
    )
  } else if (countries.length === 1) {

    return (
      <>
        <Country country={countries[0]} />
      </>
    )
  } else {
    return (
      <>
        <Countries countries={countries} onClick={onClick} />
      </>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')
  const [newList, setNewList] = useState('')


  const countriesToShow = showAll
    ? countries
    : newList

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const filteredCountries = countries.filter(c => c.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setNewList(filteredCountries)
    const amountOfCountries = filteredCountries.length
    if (event.target.value === '') {
      setShowAll(true)
    } else if (amountOfCountries === 1) {
      //console.log(`${event.target.value} only one match`)
      //setNewList(filteredPersons)

    } else if (amountOfCountries <= 10) {
      setShowAll(false)
      //console.log(`${amountOfCountries} countries in the list, which is under or equal to 10`)
    }
  }

  const handleButtonClick = (event) => {
    const name = event.target.value
    const filteredCountries = countries.filter(c => c.name.toLowerCase().includes(name.toLowerCase()))
    //console.log(filteredCountries)
    setNewList(filteredCountries)
    setShowAll(false)
    setFilter('')
  }


  return (
    <div>
      <Filter countries={countries} handleFilterChange={handleFilterChange} filter={filter} />
      <ShowCountries countries={countriesToShow} onClick={handleButtonClick} />

    </div>
  )

}

export default App;
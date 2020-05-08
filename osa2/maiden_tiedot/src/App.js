import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => (
  <>
    find countries: <input
      value={props.filter}
      onChange={props.handleFilterChange}
    />
  </>
)

const Countries = (props) => {
  //console.log('Countries saa tiedot', props)
  return (
    <>
    <h2>Countries</h2>
      <ul>
        {props.countries.map(country =>
          <li key={country.name}>
            {country.name}
            <button
              value={country.name}
              onClick={props.onClick}
            >
                show
            </button>
          </li>)}
      </ul>
    </>
  )
}

const Country = (props) => {
  console.log(props)
  if (props.country === undefined) {
    console.log('undefined')
    return (
      <>
        undefined
      </>
    )
  } else {
    return (
      <>
        <h2>{props.country.name}</h2>
        <p>capital {props.country.capital}</p>
        <p>population {props.country.population}</p>

        <h3>Spoken languages</h3>
        <ul>
          {props.country.languages.map(language =>
          <li key={language.name}> {language.name} </li>)}
        </ul>
        <img
          src={props.country.flag}
          alt={props.country.name}
          height='200'
          
        />
        
      </>
    )
  }
  
}

const ShowCountries = (props) => {
  console.log(props)
  if (props.countries.length > 10) {
    return(
      <>
      <p>too many matches, specify another filter</p>
      </>
    )
  } else if(props.countries.length === 1) {
    
    return(
      <>
        <Country country={props.countries[0]} />    
      </>
    )
  } else {
    return (
      <>
      <Countries countries={props.countries} onClick={props.onClick}/>
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
      console.log(`${event.target.value} only one match`)
      //setNewList(filteredPersons)
      
    } else if (amountOfCountries <= 10) {
      setShowAll(false)
      console.log(`${amountOfCountries} countries in the list, which is under or equal to 10`)
    }
  }

  const handleButtonClick = (event) => {
    const name = event.target.value
    const filteredCountries = countries.filter(c => c.name.toLowerCase().includes(name.toLowerCase()))
    console.log(filteredCountries)
    setNewList(filteredCountries)
    setShowAll(false)
    setFilter('')
  }
  

  return (
    <div>
      <Filter countries={countries} handleFilterChange={handleFilterChange} filter={filter}/>
      <ShowCountries countries={countriesToShow} onClick={handleButtonClick}/>
      
    </div>
  )

}

export default App;

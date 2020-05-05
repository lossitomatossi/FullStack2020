import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = (props) => {
  //console.log(props)
  return (
    <>
    <h2>Countries</h2>
      <ul>
        {props.countries.map(country =>
          <li key={country.name}>{country.name}</li>)}
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

        <h3>languages</h3>
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
  console.log(props, 'to show')

  return (
    <>
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [country, setCountry] = useState([])


  const countriesToShow = showAll
    ? countries
    : countries[0]
  //console.log(countriesToShow, 'nää pitäis näkyy')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  

  return (
    <div>
      <Country country={countries[0]} />
    </div>
  )

}

export default App;

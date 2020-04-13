import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = () => (
  <>
    <h1>give feedback</h1>
  </>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const all = props.good+props.neutral+props.bad
  const positive = (props.good / all)*100 + '%'
  const average = (props.good+props.bad*(-1))/all
  if (all > 0) {
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <tbody>
          <tr><StatisticLine text="good" value={props.good}/></tr>
          <tr><StatisticLine text="neutral" value={props.neutral}/></tr>
          <tr><StatisticLine text="bad" value={props.bad} /></tr>
          <tr><StatisticLine text="all" value={all} /></tr>
          <tr><StatisticLine text="average" value={average} /></tr>
          <tr><StatisticLine text="positive" value={positive} /></tr>
          </tbody>  
        </table>
      </>
    )
  } else {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  
}

const StatisticLine = (props) => (
  <>
    <td>{props.text}</td><td> {props.value}</td>
  </>
)





const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValueGood = (newValue) => {
    setGood(newValue)
  }

  const SetToValueNeutral = (newValue) => {
    setNeutral(newValue)
  }

  const SetToValueBad = (newValue) => {
    setBad(newValue)
  }



  return (
    <div>
      <Header />
      <Button handleClick={() => setToValueGood(good + 1)} text="good" />
      <Button handleClick={() => SetToValueNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => SetToValueBad(bad + 1)} text="bad" />
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);

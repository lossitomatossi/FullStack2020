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
  const positive = props.good / all + '%'
  const average = (props.good+props.bad*(-1))/all
  if (all > 0) {
    return (
      <>
        <h1>Statistics</h1>
          <StatisticLine text="good" value={props.good}/>
          <StatisticLine text="neutral" value={props.neutral}/>
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
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
    <p>{props.text} {props.value}</p>
  </>
)





const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValueGood = (newValue) => {
    setGood(newValue)
    console.log("good feedbacks: ",newValue)
  }

  const SetToValueNeutral = (newValue) => {
    setNeutral(newValue)
    console.log("neutral feedbacks: ",newValue)
  }

  const SetToValueBad = (newValue) => {
    setBad(newValue)
    console.log("bad feedbacks: ",newValue)
  }



  return (
    <div>
      <Header />
      <Button handleClick={() => SetToValueBad(bad + 1)} text="bad" />
      <Button handleClick={() => SetToValueNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToValueGood(good + 1)} text="good" />
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);

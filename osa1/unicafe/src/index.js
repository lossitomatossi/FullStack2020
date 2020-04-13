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
  const x = 0

  return (
    <>
      <h1>Statistics</h1>
      
        <p>Good: {props.good}</p>
        <p>Neutral: {props.neutral}</p>
        <p>Bad: {props.bad}</p>
      
    </>
  )
}



const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad + 1

  const setToValueGood = (newValue) => {
    setGood(newValue)
    console.log("good feedbacks: ",newValue)
    console.log("total feedbacks: ",all)
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
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all}/>

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);

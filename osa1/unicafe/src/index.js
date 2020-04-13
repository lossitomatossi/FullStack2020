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
      

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);

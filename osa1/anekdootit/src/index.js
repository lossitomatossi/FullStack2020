import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const Votes = (props) => (
  <p>Has {props.votes} votes</p>
)
  


const App = (props) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const [rand, setRand] = useState(0)

  const setValueToRand = () => {
    setRand(getRandomInt(6))
  }

  const [points, setPoints] = useState(new Array(6).fill(0))

  const setValueToPoints = (anecdote) => {
    const copy = [...points]
    copy[anecdote] += 1
    setPoints(copy)
  }
  
  const copy = [...points]
  copy[2] += 1

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <h1>{points}</h1>
      {props.anecdotes[rand]}
      <Votes votes = {points[rand]}/>
      <Button handleClick={() => setValueToRand()} text="new anecdote"/>
      <Button handleClick={() => setValueToPoints(rand)} text="new Vote" value={rand}/>      
      <h1>Anecdote with most wins</h1>
      {props.anecdotes[points.indexOf(Math.max(...points))]}
      <Votes votes = {points[points.indexOf(Math.max(...points))]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
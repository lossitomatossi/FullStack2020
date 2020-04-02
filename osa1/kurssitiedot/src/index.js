import React from 'react';
import ReactDOM from 'react-dom';
import { element } from 'prop-types';

const Header = (props) => {
  return (
    <>
      <h1>{props.header}</h1>
    </>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part = {props.parts[0]}/>
      <Part part = {props.parts[1]}/>
      <Part part = {props.parts[2]}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}</p>
    </>
  )
}
 
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name:'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header header={course}/>
      <Content parts={parts}/>
      <Total total={parts}/>
    </div>
    
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
import React from 'react';
import ReactDOM from 'react-dom';

const Course = (props) => {
  return (
    <div>
      <Header header={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.header}</h1>
    </>
  )
}

const Content = (props) => {
  console.log(props)
  const { parts } = props
  console.log("content saa tiedot: ", parts)
  
  
  return (
    <div>
      <ul>
        {parts.map(part =>
         <li key={part.id}>
           <Part part = {part} />
         </li>)}
      </ul>
    </div>
  )
}


const Part = (props) => {
  return (
    <>
        {props.part.name} {props.part.exercises}
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
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name:'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
     }
   ]
  }

  return (
    <div>
      <Total total={course.parts}/>
      <Course course={course}/>
    </div>
    
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
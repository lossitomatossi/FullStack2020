import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({ course }) => (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
    </div>
)

const Header = ({ header }) => (
    <>
      <h1>{header}</h1>
    </>
)

const Content = (props) => {
  const { parts } = props
  console.log("content saa tiedot: ", parts)
  const exercises = parts.map((part) => part.exercises);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = Number(exercises.reduce(reducer));
  
  return (
    <div>
      <ul>
        {parts.map(part =>
         <li key={part.id}>
           <Part part = {part} />
         </li>)}
         <Total total={total} />
      </ul>
    </div>
  )
}


const Part = ({ part }) => (
    <>
      {part.name} {part.exercises}
    </>
)

const Total = ({ total }) => {
  console.log("total saa tiedot", total)
  return (
    <>
      <li>
        <b>Number of exercises {total} </b>
      </li>
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
     },
     {
       name: 'Redux',
       exercises: 11,
       id: 4
     }
   ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
    
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
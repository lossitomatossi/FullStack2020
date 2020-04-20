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
      <h2>{header}</h2>
    </>
)

const Content = (props) => {
  const { parts } = props
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
  return (
    <>
      <li>
        <b>Number of exercises {total} </b>
      </li>
    </>
  )
}
 
const App = () => {
  const courses = [
    {
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
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]


  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <div key={course.id}>
          <Course course = {course} />
      </div>)}
    </div>
    
    
    
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
import React from 'react'

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
                        <Part part={part} />
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

export default Course
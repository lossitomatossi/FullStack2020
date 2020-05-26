const express = require('express')
const app = express()

let people = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 4
    },
    {
        name: "Dan Abramov",
        numbeid: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        numbeid: "39-23-6423122",
        id: 4
    }
]

app.get('/api/persons', (req, res) => {
    res.json(people)
})

app.get('/info', (req, res) => {
    const people_amount = people.length
    const date = new Date()
    res.send(
        `<p>Phonebook has info for ${people_amount} people</p><p>${date}</p>`
    )
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

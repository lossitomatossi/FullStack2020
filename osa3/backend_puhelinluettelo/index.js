const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('data', function (req, res) { return JSON.stringify(req.body)})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
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
    },
    {
        name: "Testi",
        number: "pepperoni",
        id: 5
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const people_amount = persons.length
    const date = new Date()
    res.send(
        `<p>Phonebook has info for ${people_amount} people</p><p>${date}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const rId = Math.floor(Math.random() * Math.floor(10000))
    return rId
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const nameExist = persons.filter(person => person.id === body.name)
    if (nameExist) {
        return response.status(403).json({
            error: `name '${body.name}' already exists`
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

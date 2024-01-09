
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
  "name": "Arto Hellas",
  "number": "040-123456",
  "id": 1
  },
  {
  "name": "Ada Lovelace",
  "number": "39-44-5323523",
  "id": 2
  },
  {
  "name": "Dan Abramov",
  "number": "12-43-234345",
  "id": 3
  },
  {
  "name": "Mary Poppendieck",
  "number": "39-23-6423122",
  "id": 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World! This is phonebook</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>`)
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

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  if (persons.map(p => p.name.toLowerCase()).includes(body.name.toLowerCase())) {
    return response.status(409).json({
      error: 'name already exists'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: persons.length > 0 ? getRandomIntInclusive(1, 999) : 1
  }
  
  persons = persons.concat(person) // id uniqueness is not guaranteed

  response.json(person)
})

/* from mdn web docs: */ 
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

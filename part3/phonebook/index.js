import express from 'express'
import morgan from 'morgan'
//import { getPersons, addPerson, deletePerson } from "./handleData.js";
import Person from './models/person.js'
import 'dotenv/config'

const app = express()
app.use(express.json())

morgan.token('body', (req) => {
  return req.method === 'POST' && req.body
    ? Buffer.from(JSON.stringify(req.body))
    : ''
})
app.use(
  morgan(
    'Server output: :method :url :status :res[content-length] - :response-time ms :body',
  ),
)

app.use(express.static('dist'))

app.get('/info', async (req, res, next) => {
  try {
    console.log(`/info: ${req.url}`)

    res.setHeader('Content-Type', 'text/html')
    res.write(
      `<h2>Phonebook has info for ${await Person.countDocuments({})} people.</h2>`,
    )
    const date = new Date()
    res.write(`<p>${date}</p>`)

    res.end()
  } catch (e) {
    next(e)
  }
})

app.get('/api/persons', async (req, res, next) => {
  try {
    const result = await Person.find({})
    console.log(result)
    res.json(result)
  } catch (e) {
    next(e)
  }
})

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    console.log(id)
    const person = await Person.findById(id)
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  } catch (e) {
    next(e)
  }
})

app.post('/api/persons', async (req, res, next) => {
  try {
    const inputPerson = req.body

    if (!req.body) return res.status(400).json('{error: Content missing!}')

    if (!['name', 'number'].every((key) => key in inputPerson))
      return res.status(400).json('{ error: Missing Input }')

    //IF statement to Check for unique name

    const person = new Person({
      name: inputPerson.name,
      number: inputPerson.number,
    })

    const result = await person.save()
    res.status(201).json(result)
  } catch (e) {
    next(e)
  }
})

//PUT request to change number
app.put('/api/persons/:id', async (req, res, next) => {
  try {
    if (!req.body) return res.status(400).json('{error: Content missing!}')

    if (!['name', 'number'].every((key) => key in req.body))
      return res.status(400).json('{ error: Missing Input }')

    const updatePerson = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
    )

    if (!updatePerson) {
      return res.status(404).json({ error: 'Person not found' })
    }

    res.status(200).json(updatePerson)
  } catch (e) {
    next(e)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id)
    console.log(`Deleted: ${deletedPerson}`)
    if (!deletedPerson) {
      return res.status(404).json({ error: 'Person not found' })
    }

    res.status(204).json(deletedPerson)
  } catch (e) {
    next(e)
  }
})

//Error handler goes here
const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))

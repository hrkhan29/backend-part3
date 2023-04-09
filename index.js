require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.static('build'))
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
const mongoore = require('mongoose')

/*let persons = [
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
    },
    {
      "name": "hafiz",
      "number": "2345",
      "id": 5
    }
  ]
*/

const Person = require('./models/person')

/*const inf = '<div>Phonebook has info for ' + persons.length + ' people.</div> <p>' + new Date() + '</p>'*/

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

/*app.get('/info', (request, response) => {
  response.send(inf)
})*/

app.get('/api/persons', (request, response) => {
let entries = {}
Person.find({}).then(result => return result)
  mongoose.connection.close();
})
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const person = persons.find(person => person.id === id)
  if (person) {
  response.json(person)
	}
  else {response.status(404).end()}
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  Rid = Math.ceil(Math.random()*100/2)
  console.log(Rid)
  return maxId+Rid
}

app.post('/api/persons', (request, response) => {
  console.log(request.body.number)
   
  if (!(request.body.name) || !(request.body.number)) {
    return response.status(400).json({ 
      error: 'Both name and number are required!' 
    })
  }

  else {let reqName = persons.some(person => request.body.name === person.name);
  console.log(reqName, request.body.name);
  if (!reqName) {
  const person = {
    name: request.body.name,
    number: request.body.number,
    id: generateId(),
  };
  persons = persons.concat(person);
  response.json(person);
		}
  else {return response.status(400).json({ 
      error: 'Name must be unique!' 
    		})
	}
  }
	})


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})

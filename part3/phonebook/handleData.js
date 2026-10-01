let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

export const getPersons = () => persons

export const addPerson = (newPerson) => {
  const newPersonId = { ...newPerson, id: Math.floor(Math.random() * 100000) }
  persons = persons.concat(newPersonId)
  return newPersonId
}

export const deletePerson = (id) => {
  persons = persons.filter((p) => p.id !== id)
}

export default { getPersons, addPerson, deletePerson }

import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Form = ({functions}) => {
  const [addPerson, handleNameChange, handleNumberChange] = functions
  return (
    <div>
            <h2>Phonebook</h2>
          <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

    </div>

    )
}

const Phonebook = ({persons}) => {
  return (
    <div>
            <h2>Numbers</h2>
          {persons.map(person => <p key={person.id}>{person.name} - {person.number}</p>)}
    </div>

)
}


const Filter = ({filterNames}) => {
  return (
    <div>
      Search: <input onChange={filterNames}/>
    </div>
  )
}

const App = () => {

  useEffect(() => {
    const fetchData = async () => {
    const response = await axios.get('http://localhost:3001/persons')
    setPersons(response.data)
  }
  fetchData()
}, [])

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
 
  const filterNames = (e) => {
    const filtered = persons.filter(i => i.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setPersons(filtered)
  }
  
  const addPerson = (e) => {
  e.preventDefault()
  persons.find(i => i.name === newName) ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat({
    name: newName,
    id: persons.length + 1,
    number: newNumber
  }))
  setNewName('')
  e.target.reset()
}
  return (
    <div>
      <Filter filterNames={filterNames}/>
      <Form functions={[addPerson, handleNameChange, handleNumberChange]}/>
      <Phonebook persons={persons}/>
    </div>
  )

}

export default App
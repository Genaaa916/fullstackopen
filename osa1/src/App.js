import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { post } from "jquery";

const Form = ({ functions }) => {
  const [addPerson, handleNameChange, handleNumberChange] = functions;
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};
const Phonebook = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} - {person.number}
        </p>
      ))}
    </div>
  );
};
const Filter = ({ filterNames }) => {
  return (
    <div>
      Search: <input onChange={filterNames} />
    </div>
  );
};
const App = () => {
  const [error, setError] = useState(null);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/persons");
        setPersons(response.data);
        setError(null);
      } catch (err) {
        setError(err);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const filterNames = (e) => {
    const filtered = persons.filter((i) =>
      i.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setPersons(filtered);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    persons.find((i) => i.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPerson));
    const postPerson = async () => {
      try {
        await axios.post("http://localhost:3001/persons", newPerson);
      } catch (err) {
        setError(err);
        console.log("error");
      }
    };
    postPerson();
    setNewName("");
    e.target.reset();
  };
  return (
    <div>
      <Filter filterNames={filterNames} />
      <Form functions={[addPerson, handleNameChange, handleNumberChange]} />
      {!error ? (
        <Phonebook persons={persons} />
      ) : (
        <div>
          <p>Something went wrong</p>
          <p>{error.message}</p>
          <button onClick={addPerson}>Try again</button>
        </div>
      )}
    </div>
  );
};

export default App;

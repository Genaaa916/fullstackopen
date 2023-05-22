import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

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

const Phonebook = ({ persons, deletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div>
          {" "}
          <p className="person" key={person._id}>
            {person.name} - {person.number}
          </p>
          <button onClick={() => deletePerson(person)}>Delete</button>
        </div>
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

  const baseUrl = "/api/";

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const response = await axios.get(`${baseUrl}persons`);
      console.log(response);
      setPersons(response.data);
      setError(null);
    } catch (err) {
      setError(err);
      console.log(error);
    }
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const filterNames = (e) => {
    const searchValue = e.target.value.toLowerCase();

    const filteredPersons = persons.filter((i) =>
      i.name.toLowerCase().includes(searchValue)
    );

    setPersons(filteredPersons);
    console.log(filteredPersons);
  };

  const updatePerson = async (person) => {
    window.confirm(`${person.name} is already added, replace the old number?`);
    try {
      const updatedPerson = { ...person, number: newNumber };
      await axios.put(`${baseUrl}persons/${person._id}`, updatedPerson);
      setPersons(
        persons.map((i) => (i._id !== person._id ? i : updatedPerson))
      );
    } catch (err) {
      setError(err.response);
      console.log(err.response);
    }
  };

  const addPerson = async (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    try {
      await axios.post(`${baseUrl}persons`, newPerson);
      setPersons([...persons, newPerson]);
    } catch (err) {
      err.response.status === 409 ? updatePerson(newPerson) : setError(err);
    }

    setNewNumber("");
    setNewName("");
    e.target.reset();
  };

  const deletePerson = async (person) => {
    try {
      console.log(persons);
      await axios.delete(`${baseUrl}persons/${person._id}`);
      setPersons(persons.filter((i) => i._id !== person._id));
      setError(null);
    } catch (err) {
      setError(err.response);
      console.log(err.response);
    }
  };

  return (
    <div>
      <Filter filterNames={filterNames} />
      <Form functions={[addPerson, handleNameChange, handleNumberChange]} />
      {!error ? (
        <Phonebook deletePerson={deletePerson} persons={persons} />
      ) : (
        <div className="error">
          <p>Something went wrong</p>
          <p>{error.status === 404 ? "Not found" : error.message}</p>
          <button onClick={addPerson}>Try again</button>
        </div>
      )}
    </div>
  );
};

export default App;

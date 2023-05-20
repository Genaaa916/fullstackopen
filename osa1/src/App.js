import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Form = ({ functions, persons }) => {
  const [updateOrAddPerson, handleNameChange, handleNumberChange] = functions;
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={() => updateOrAddPerson(persons)}>
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
          <p key={person.id}>
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

  const baseUrl = "http://localhost:3001/";

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}persons`);
      setPersons(response.data);
      setError(null);
      console.log(persons);
    } catch (err) {
      setError(err);
      console.log(error);
    }
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const updateOrAddPerson = (persons) => {
    const person = persons.find((i) => i.name === newName);
    person ? updatePerson(person) : addPerson();
  };

  const filterNames = (e) => {
    const searchValue = e.target.value.toLowerCase();

    const filteredPersons = persons.filter((i) =>
      i.name.toLowerCase().includes(searchValue)
    );

    setPersons(filteredPersons);
    console.log(filteredPersons);
  };

  const updatePerson = (person) => {
    window.confirm(`${person.name} is already added, replace the old number?`);
    const updatedPerson = { ...person, number: newNumber };
    axios.put(`${baseUrl}persons/${person.id}`, updatedPerson);
    setPersons(persons.map((i) => (i.id !== person.id ? i : updatedPerson)));
  };

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    (async () => {
      try {
        await axios.post(`${baseUrl}persons`, newPerson);
      } catch (err) {
        setError(err);
        console.log("error");
      }
    })();
    setPersons(persons.concat(newPerson));
    setNewName("");
    e.target.reset();
  };

  const deletePerson = (person) => {
    axios.delete(`${baseUrl}persons/${person.id}`);
    setPersons(persons.filter((i) => i.id !== person.id));
  };

  return (
    <div>
      <Filter filterNames={filterNames} />
      <Form
        persons={persons}
        functions={[
          addPerson,
          handleNameChange,
          handleNumberChange,
          updateOrAddPerson,
        ]}
      />
      {!error ? (
        <Phonebook
          updatepPerson={updatePerson}
          deletePerson={deletePerson}
          persons={persons}
        />
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

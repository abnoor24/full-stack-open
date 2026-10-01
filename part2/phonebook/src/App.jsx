import { useState, useEffect } from "react";
import axios from "axios";
import phonebookServices from "./services/phonebook";
//File System imports
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import AlertBox from "./components/AlertBox";

const App = () => {
  //State Declaration
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [isShown, setIsShown] = useState({ status: "false", dialogue: "" });

  useEffect(() => {
    // console.log(phonebookServices.getAll());

    try {
      phonebookServices.getAll().then((phonebook) => setPersons(phonebook));
    } catch (e) {
      console.error(e);
    }
  }, []);

  function changeFilter(event) {
    event.preventDefault();
    setFilter(event.target.value);
  }

  function handleNameInput(event) {
    event.preventDefault();
    setNewName(event.target.value);
  }

  function handleNumInput(event) {
    event.preventDefault();
    setNewNumber(event.target.value);
  }

  function addToPhonebook(event) {
    event.preventDefault();

    if (newNumber === "") {
      alert(`PhoneNumber cannot be empty`);
    } else if (persons.some((person) => person.name === newName)) {
      // Replace an existing number
      if (
        window.confirm(
          `${newName} is already added to phonebook. Replace the old number with the new one?`,
        )
      ) {
        const oldPerson = persons.find((person) => person.name === newName);
        const updatePerson = { ...oldPerson, number: newNumber };

        phonebookServices
          .changeNumber(oldPerson.id, updatePerson)
          .then((updatedPerson) =>
            setPersons((prev) =>
              prev.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person,
              ),
            ),
          )
          .catch(() => {
            setIsShown({
              status: "404",
              dialogue: `Information of ${deletePerson.name} has already been removed from the server`,
            });
            setPersons(persons.filter((p) => p.name !== newName));
          });

        setIsShown({ status: "true", dialogue: `Updated Phone Number` });
      }
    } else {
      // Add a new Contact
      const newPerson = { name: newName, number: newNumber };

      phonebookServices
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons((prev) => [...prev, returnedPerson]);
          setIsShown({ status: "true", dialogue: `Added ${newPerson.name}` });
        })
        .catch((e) => setIsShown({ status: "404", dialogue: e.message }));
    }
    setNewName("");
    setNewNumber("");
  }

  function deletePerson(id) {
    const deletePerson = persons.find((person) => person.id === id);

    if (window.confirm(`Do you want to delete ${deletePerson.name}`)) {
      phonebookServices
        .deletePerson(id)
        .then((response) => {
          setPersons((prev) => prev.filter((person) => person.id !== id));
          setIsShown({
            status: "true",
            dialogue: `Deleted ${deletePerson.name}`,
          });
        })
        .catch(() => {
          setIsShown({
            status: "404",
            dialogue: `Information of ${deletePerson.name} has already been removed from the server`,
          });
          setPersons(persons.filter((p) => p.name !== newName));
        });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <AlertBox isShown={isShown} setIsShown={setIsShown} />
      <Filter value={filter} onChange={changeFilter} />

      <PersonForm
        addToPhonebook={addToPhonebook}
        newName={newName}
        handleNameInput={handleNameInput}
        newNumber={newNumber}
        handleNumInput={handleNumInput}
      />

      <h2>Numbers:</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;

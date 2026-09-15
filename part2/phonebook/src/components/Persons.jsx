const Persons = ({ persons, filter, deletePerson }) =>
  persons.map((person) => {
    if (person.name.includes(filter))
      return (
        <div key={`${person.id}-div`}>
          <span key={person.id}>
            {person.name}: {person.number}
          </span>
          <button
            key={`${person.id}-d`}
            onClick={() => deletePerson(person.id)}
          >
            Delete
          </button>
        </div>
      );
    else return "";
  });

export default Persons;

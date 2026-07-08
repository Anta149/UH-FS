const Persons = ({ personsToShow, deletePersonOf }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePersonOf(person.id, person.name)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};
export default Persons;

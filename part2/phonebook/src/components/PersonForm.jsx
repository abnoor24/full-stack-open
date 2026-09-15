const PersonForm = (props) => (
  <form onSubmit={props.addToPhonebook}>
    <h2>Add a new </h2>
    <div>
      name:{" "}
      <input
        value={props.newName}
        onChange={props.handleNameInput}
        name="nameInput"
      />
      <div>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumInput} />
      </div>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;

// />

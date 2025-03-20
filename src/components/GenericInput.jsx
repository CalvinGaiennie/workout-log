import { useState } from "react";

function GenericInput({ title, handleSubmit }) {
  const [value, setValue] = useState();
  return (
    <div className="d-flex flex-column">
      <h2>{title}</h2>
      <input onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => handleSubmit(value)}>Submit</button>
    </div>
  );
}

export default GenericInput;

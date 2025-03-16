function Exercise({ exercise, dispatch }) {
  return (
    <div>
      <h3>{exercise.name}</h3>
      <div className="d-flex flex-column gap-2">
        {exercise.sets.map((set) => (
          <input key={set} placeholder={`Set ${set}`} />
        ))}
        <button
          onClick={() => dispatch({ type: "ADD_SET", payload: exercise.name })}
        >
          Add Set
        </button>
      </div>
    </div>
  );
}

export default Exercise;

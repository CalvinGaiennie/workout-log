function Exercise({ exercise, addSet }) {
  return (
    <div>
      <h3>{exercise.name}</h3>
      <div className="d-flex flex-column gap-2">
        {exercise.sets.map((set) => (
          <input key={set} placeholder={`Set ${set}`} />
        ))}
        <button onClick={() => addSet(exercise.name)}>Add Set</button>
      </div>
    </div>
  );
}

export default Exercise;

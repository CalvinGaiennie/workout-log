import Exercise from "./Exercise";
function Workout({ workout, addExercise, addSet }) {
  return (
    <div className="d-flex flex-column gap-2">
      <h1>{workout.name}</h1>
      <input type="text" placeholder="Workout Name" />
      {workout.exercises.map((exercise) => (
        <Exercise key={exercise.name} exercise={exercise} addSet={addSet} />
      ))}
      <button onClick={() => addExercise()}>Add Exercise</button>
    </div>
  );
}

export default Workout;

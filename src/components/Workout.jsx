import Exercise from "./Exercise";
function Workout({ workout, dispatch }) {
  return (
    <div className="d-flex flex-column m-3">
      <h1>{workout.name}</h1>
      <input
        type="text"
        placeholder="Workout Name"
        value={workout.name}
        onChange={(e) =>
          dispatch({
            type: "SET_CURRENT_WORKOUT_NAME",
            payload: e.target.value,
          })
        }
      />
      {workout.exercises.map((exercise) => (
        <Exercise key={exercise.id} exercise={exercise} dispatch={dispatch} />
      ))}
      <button onClick={() => dispatch({ type: "ADD_EXERCISE" })}>
        Add Exercise
      </button>
    </div>
  );
}

export default Workout;

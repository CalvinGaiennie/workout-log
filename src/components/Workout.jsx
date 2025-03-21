import Exercise from "./Exercise";
function Workout({ workout, dispatch }) {
  return (
    <div className="d-flex flex-column p-5 m-3 border border-black border-2">
      <input
        className="input"
        type="text"
        placeholder="Workout Name"
        style={{ fontSize: "28px" }}
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

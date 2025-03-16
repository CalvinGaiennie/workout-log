function WorkoutCard({ workout, dispatch }) {
  return (
    <div
      className="card p-2"
      onClick={() =>
        dispatch({ type: "SET_CURRENT_WORKOUT", payload: workout })
      }
    >
      <h2>{workout.name}</h2>
      <p>{workout.description}</p>
    </div>
  );
}

export default WorkoutCard;

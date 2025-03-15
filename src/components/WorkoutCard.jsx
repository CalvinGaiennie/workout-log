function WorkoutCard({ workout, onWorkoutChange }) {
  return (
    <div className="card p-2" onClick={() => onWorkoutChange(workout)}>
      <h2>{workout.name}</h2>
      <p>{workout.description}</p>
    </div>
  );
}

export default WorkoutCard;

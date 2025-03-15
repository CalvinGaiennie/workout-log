function Workout({ workout }) {
  return (
    <form className="d-flex flex-column gap-2">
      <label htmlFor="workoutName">{workout.name}</label>
      <input type="text" placeholder="Workout Name" />
      <button type="submit">Add Workout</button>
    </form>
  );
}

export default Workout;

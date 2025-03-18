import { useState } from "react";

function Exercise({ exercise, dispatch }) {
  const [exerciseName, setExerciseName] = useState(exercise.name);
  return (
    <div>
      <h3>{exerciseName}</h3>
      <input
        type="text"
        placeholder="Exercise Name"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
        onBlur={() =>
          dispatch({
            type: "SET_CURRENT_EXERCISE_NAME",
            payload: { id: exercise.id, name: exerciseName },
          })
        }
      />
      <div className="d-flex flex-column">
        {exercise.sets.map((set, index) => (
          <input
            key={`${set}-${index}-${exerciseName}`}
            placeholder={`Set ${index + 1}`}
          />
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

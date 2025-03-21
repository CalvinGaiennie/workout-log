import { useState } from "react";

function Exercise({ exercise, dispatch }) {
  const [exerciseName, setExerciseName] = useState(exercise.name);
  const [sets, setSets] = useState(exercise.sets);
  return (
    <div>
      <input
        className="input mt-1"
        type="text"
        style={{ fontSize: "20px" }}
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
      {/* Need to change on blur so that you dont loose data if you change notes before changing focus */}
      <div className="d-flex flex-column">
        {exercise.sets.map((set, index) => (
          <div className="d-flex">
            <span>{index + 1}.</span>
            <input
              className="input"
              key={`${set}-${index}-${exerciseName}`}
              placeholder={`Set ${index + 1}`}
              value={sets[index]}
              onChange={(e) =>
                setSets(sets.map((s, i) => (i === index ? e.target.value : s)))
              }
              onBlur={() =>
                dispatch({
                  type: "SET_SETS",
                  payload: { id: exercise.id, sets },
                })
              }
            />
          </div>
        ))}
        {/* Need to change on blur so that you dont loose data if you change notes before changing focus */}
        <hr className="border border-1 border-dark"></hr>
        <button
          className="mt-3"
          onClick={() => dispatch({ type: "ADD_SET", payload: exercise.name })}
        >
          Add Set
        </button>
      </div>
    </div>
  );
}

export default Exercise;

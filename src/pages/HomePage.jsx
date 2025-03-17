import Sidebar from "../components/Sidebar";
import Workout from "../components/Workout";
import { useEffect, useReducer } from "react";
import { getWorkouts } from "../services/api";

const initialState = {
  currentWorkout: {
    name: "Default Workout",
    duration: 30,
    exercises: [{ name: "Exercise 1", sets: [1, 2, 3] }],
  },

  workouts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_WORKOUT":
      return { ...state, currentWorkout: action.payload };
    case "SET_WORKOUTS":
      return { ...state, workouts: action.payload };
    case "ADD_EXERCISE":
      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: [
            ...state.currentWorkout.exercises,
            { name: "Exercise 1", sets: [1, 2, 3] },
          ],
        },
      };
    case "ADD_SET":
      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: state.currentWorkout.exercises.map((exercise) =>
            exercise.name === action.payload
              ? { ...exercise, sets: [...exercise.sets, 1] }
              : exercise
          ),
        },
      };
    case "SET_CURRENT_WORKOUT_NAME":
      return {
        ...state,
        currentWorkout: { ...state.currentWorkout, name: action.payload },
      };
    case "SET_CURRENT_EXERCISE_NAME":
      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: state.currentWorkout.exercises.map((exercise) =>
            exercise.name === action.payload
              ? { ...exercise, name: action.payload }
              : exercise
          ),
        },
      };
    default:
      return state;
  }
};

function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.workouts);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getWorkouts();
        dispatch({ type: "SET_WORKOUTS", payload: data });
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar dispatch={dispatch} workouts={state.workouts} />
      <div className="p-3">
        <Workout workout={state.currentWorkout} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default HomePage;

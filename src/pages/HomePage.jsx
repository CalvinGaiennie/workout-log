import Sidebar from "../components/Sidebar";
import Workout from "../components/Workout";
import { useEffect, useReducer } from "react";
import { deleteWorkout, getWorkouts, updateWorkout } from "../services/api";
import { createWorkout } from "../services/api";

const initialState = {
  currentWorkout: {
    name: "Default Workout",
    duration: 30,
    exercises: [
      {
        id: crypto.randomUUID(),
        name: "Exercise 1",
        sets: [1, 2, 3],
      },
    ],
  },

  workouts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_WORKOUT":
      return {
        ...state,
        currentWorkout: {
          ...action.payload,
          exercises: action.payload.exercises.map((exercise) => ({
            ...exercise,
            id: exercise.id || crypto.randomUUID(),
          })),
        },
      };
    case "SET_WORKOUTS":
      return { ...state, workouts: action.payload };
    case "ADD_EXERCISE":
      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: [
            ...state.currentWorkout.exercises,
            {
              id: crypto.randomUUID(),
              name: "Exercise 1",
              sets: [1, 2, 3],
            },
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
            exercise.id === action.payload.id
              ? { ...exercise, name: action.payload.name }
              : exercise
          ),
        },
      };
    case "UPDATE_WORKOUT_SUCCESS":
      return {
        ...state,
        workouts: state.workouts.map((w) =>
          w._id === action.payload._id ? action.payload : w
        ),
      };
    case "CREATE_WORKOUT_SUCCESS":
      return {
        ...state,
        currentWorkout: action.payload,
        workouts: [...state.workouts, action.payload],
      };
    case "SET_SETS":
      return {
        ...state,
        currentWorkout: {
          ...state.currentWorkout,
          exercises: state.currentWorkout.exercises.map((exercise) =>
            exercise.id === action.payload.id
              ? { ...exercise, sets: action.payload.sets }
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

  const handleSaveWorkout = async () => {
    try {
      let savedWorkout;
      console.log("Saving workout with ID:", state.currentWorkout._id);
      if (state.currentWorkout._id) {
        savedWorkout = await updateWorkout(state.currentWorkout);
        dispatch({ type: "UPDATE_WORKOUT_SUCCESS", payload: savedWorkout });
      } else {
        savedWorkout = await createWorkout(state.currentWorkout);
        dispatch({ type: "CREATE_WORKOUT_SUCCESS", payload: savedWorkout });
      }
    } catch (error) {
      console.error("Failed to save workout:", error.response?.data || error);
    }
  };
  const handleDeleteWorkout = async () => {
    try {
      if (!state.currentWorkout._id) return; // Don't try to delete if no ID

      await deleteWorkout(state.currentWorkout);
      // Update the workouts list
      dispatch({
        type: "SET_WORKOUTS",
        payload: state.workouts.filter(
          (w) => w._id !== state.currentWorkout._id
        ),
      });
      // Reset current workout to default
      dispatch({
        type: "SET_CURRENT_WORKOUT",
        payload: initialState.currentWorkout,
      });
    } catch (error) {
      console.error("Failed to delete workout:", error.response?.data || error);
    }
  };

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

  useEffect(() => {
    console.log("current workout", state.currentWorkout);
  }, [state.currentWorkout]);

  useEffect(() => {
    handleSaveWorkout();
  }, [state.currentWorkout]);
  return (
    <div>
      <div className="d-flex">
        <Sidebar dispatch={dispatch} workouts={state.workouts} />
        <div>
          <Workout workout={state.currentWorkout} dispatch={dispatch} />
          <button className="btn mt-3 btn-danger" onClick={handleDeleteWorkout}>
            Delete Workout
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

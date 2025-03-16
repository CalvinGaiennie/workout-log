import Sidebar from "../components/Sidebar";
import Workout from "../components/Workout";
import { useState, useEffect } from "react";
import { getWorkouts } from "../services/api";

function HomePage() {
  const [currentWorkout, setCurrentWorkout] = useState({
    name: "Default Workout",
    duration: 30,
    exercises: [{ name: "Exercise 1", sets: [1, 2, 3] }],
  });
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);
  function handleWorkoutChange(workout) {
    setCurrentWorkout(workout);
  }

  function addExercise() {
    setCurrentWorkout({
      ...currentWorkout,
      exercises: [
        ...currentWorkout.exercises,
        { name: "New Exercise", sets: [] },
      ],
    });
  }

  function addSet(exerciseName) {
    setCurrentWorkout({
      ...currentWorkout,
      exercises: currentWorkout.exercises.map((exercise) =>
        exercise.name === exerciseName
          ? { ...exercise, sets: [...exercise.sets, "New Set"] }
          : exercise
      ),
    });
  }

  const fakeWorkouts = [
    {
      id: 1,
      name: "Workout 1",
      description: "Workout 1 Description",
      exercises: [{ name: "Exercise 1", sets: [1, 2, 3] }],
    },
    {
      id: 2,
      name: "Workout 2",
      description: "Workout 2 Description",
      exercises: [
        { name: "Exercise A", sets: [1, 2, 3] },
        { name: "Exercise B", sets: [1, 2, 3] },
      ],
    },
    {
      id: 3,
      name: "Workout 3",
      description: "Workout 3 Description",
      exercises: [
        { name: "Exercise One", sets: [1, 2, 3] },
        { name: "Exercise Two", sets: [1, 2, 3] },
        { name: "Exercise Three", sets: [1, 2, 3] },
      ],
    },
  ];

  return (
    <div className="d-flex">
      <Sidebar onWorkoutChange={handleWorkoutChange} workouts={fakeWorkouts} />
      <div className="p-3">
        <Workout
          workout={currentWorkout}
          addExercise={addExercise}
          addSet={addSet}
        />
      </div>
    </div>
  );
}

export default HomePage;

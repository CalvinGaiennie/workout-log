import Sidebar from "../components/Sidebar";
import Workout from "../components/Workout";
import { useState } from "react";

function HomePage() {
  const [currentWorkout, setCurrentWorkout] = useState({
    name: "Default Workout",
    duration: 30,
  });

  function handleWorkoutChange(workout) {
    setCurrentWorkout(workout);
  }

  const workouts = [
    {
      id: 1,
      name: "Workout 1",
      description: "Workout 1 Description",
    },
    {
      id: 2,
      name: "Workout 2",
      description: "Workout 2 Description",
    },
    {
      id: 3,
      name: "Workout 3",
      description: "Workout 3 Description",
    },
  ];

  return (
    <div className="d-flex">
      <Sidebar onWorkoutChange={handleWorkoutChange} workouts={workouts} />
      <div className="p-3">
        <h1>{currentWorkout?.name}</h1>
        <Workout workout={currentWorkout} />
      </div>
    </div>
  );
}

export default HomePage;

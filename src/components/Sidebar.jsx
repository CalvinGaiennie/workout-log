import { useState } from "react";
import WorkoutCard from "./WorkoutCard";

function Sidebar({ onWorkoutChange, workouts }) {
  const [isOpen, setIsOpen] = useState(true);

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="d-flex p-3">
      <div className={`${isOpen ? "d-none" : ""}`}>
        <h1>Sidebar</h1>
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onWorkoutChange={onWorkoutChange}
          />
        ))}
      </div>
      <button
        className="toggle-button"
        onClick={toggleSidebar}
        style={{ height: "30px", width: "30px" }}
      >
        {isOpen ? "←" : "→"}
      </button>
    </div>
  );
}

export default Sidebar;

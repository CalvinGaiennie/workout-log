import axios from "axios";

const API_URL = "http://localhost:5001/api";

export const getWorkouts = async () => {
  const response = await axios.get(`${API_URL}/workouts`);
  return response.data;
};

export const createWorkout = async (workout) => {
  const response = await axios.post(`${API_URL}/workouts`, workout);
  return response.data;
};

export const updateWorkout = async (workout) => {
  const response = await axios.put(
    `${API_URL}/workouts/${workout._id}`,
    workout
  );
  return response.data;
};

export const deleteWorkout = async (workout) => {
  const response = await axios.delete(`${API_URL}/workouts/${workout._id}`);
  return response.data;
};

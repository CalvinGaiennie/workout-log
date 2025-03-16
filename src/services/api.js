import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getWorkouts = async () => {
  const response = await axios.get(`${API_URL}/workouts`);
  return response.data;
};

export const createWorkout = async (workout) => {
  const response = await axios.post(`${API_URL}/workouts`, workout);
  return response.data;
};

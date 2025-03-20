import axios from "axios";

const API_URL = "http://localhost:5001/api";

//Workouts
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

//Weights
export const getWeights = async () => {
  const response = await axios.get(`${API_URL}/weights`);
  return response.data;
};

export const createWeight = async (weight) => {
  const response = await axios.post(`${API_URL}/weights`, weight);
  return response.data;
};

export const updateWeight = async (weight) => {
  const response = await axios.put(`${API_URL}/weights/${weight._id}`, weight);
  return response.data;
};

export const deleteWeight = async (weight) => {
  const response = await axios.delete(`${API_URL}/weights/${weight._id}`);
  return response.data;
};

//Protein
export const getProtein = async () => {
  const response = await axios.get(`${API_URL}/protein`);
  return response.data;
};

export const createProtein = async (protein) => {
  const response = await axios.post(`${API_URL}/protein`, protein);
  return response.data;
};

export const updateProtein = async (protein) => {
  const response = await axios.put(
    `${API_URL}/protein/${protein._id}`,
    protein
  );
  return response.data;
};

export const deleteProtein = async (protein) => {
  const response = await axios.delete(`${API_URL}/protein/${protein._id}`);
  return response.data;
};

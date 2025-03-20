import AppNav from "../components/AppNav";
import { useReducer, useEffect } from "react";
import GenericChart from "../components/GenericChart";
import { getWeights, getProtein } from "../services/api";

const initialState = {
  example: [
    { weight: 152, date: "2025-03-16" },
    { weight: 155, date: "2025-03-17" },
    { weight: 153, date: "2025-03-18" },
    { weight: 154, date: "2025-03-19" },
    { weight: 156, date: "2025-03-20" },
    { weight: 157, date: "2025-03-21" },
    { weight: 158, date: "2025-03-22" },
    { weight: 159, date: "2025-03-23" },
    { weight: 160, date: "2025-03-24" },
    { weight: 161, date: "2025-03-25" },
    { weight: 162, date: "2025-03-26" },
    { weight: 163, date: "2025-03-27" },
    { weight: 161, date: "2025-03-28" },
    { weight: 162, date: "2025-03-29" },
    { weight: 163, date: "2025-03-30" },
  ],
  protein: [],
  weights: [],
  workouts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_WEIGHTS":
      return { ...state, weights: action.payload };
    case "SET_PROTEIN":
      return { ...state, protein: action.payload };
    case "SET_WORKOUTS":
      return { ...state, workouts: action.payload };
    default:
      return state;
  }
};

function ProgressPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const weightChartSettings = {
    YDMin: 140,
    YDMax: 175,
    XMin: 140,
    XMax: 170,
    YTicks: 5,
  };

  useEffect(() => {
    console.log("Current state:", state);
  }, [state]);

  useEffect(() => {
    const fetchWeights = async () => {
      try {
        const weights = await getWeights();
        console.log("Fetched weights:", weights);
        dispatch({ type: "SET_WEIGHTS", payload: weights });
      } catch (error) {
        console.error("Error fetching weights:", error);
      }
    };
    fetchWeights();
  }, []);

  // useEffect(() => {
  //   const fetchProtein = async () => {
  //     const protein = await getProtein();
  //     dispatch({ type: "SET_PROTEIN", payload: protein });
  //   };
  //   fetchProtein();
  // }, []);

  return (
    <div>
      <AppNav />
      <GenericChart
        data={state.example}
        title="Weight"
        chartSettings={weightChartSettings}
      />
      <GenericChart data={state.weights} title="Real Weight" />
    </div>
  );
}

export default ProgressPage;

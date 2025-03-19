import AppNav from "../components/AppNav";
import { useReducer } from "react";
import GenericChart from "../components/GenericChart";
// const initialState = {
//   example: [
//     { weight: 100, date: "2021-01-01" },
//     { weight: 200, date: "2021-01-02" },
//     { weight: 300, date: "2021-01-03" },
//     { weight: 400, date: "2021-01-04" },
//     { weight: 500, date: "2021-01-05" },
//     { weight: 600, date: "2021-01-06" },
//     { weight: 700, date: "2021-01-07" },
//   ],
// };
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
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EXAMPLE":
      return {};
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
  return (
    <div>
      <AppNav />
      <GenericChart
        data={state.example}
        title="Weight"
        chartSettings={weightChartSettings}
      />
      <GenericChart data={state.example} />
    </div>
  );
}

export default ProgressPage;

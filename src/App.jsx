import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressPage from "./pages/ProgressPage";
import OtherInputs from "./pages/OtherInputs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/other-inputs" element={<OtherInputs />} />
        <Route path="*" element={<Navigate to="/homepage" />} />
      </Routes>
    </Router>
  );
}

export default App;

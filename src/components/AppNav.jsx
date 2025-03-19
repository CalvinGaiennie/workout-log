import { Link } from "react-router-dom";

function AppNav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light m-1">
      <Link className="navbar-brand" to="/homepage">
        Home
      </Link>
      <Link className="navbar-brand" to="/other-inputs">
        Other Inputs
      </Link>
      <Link className="navbar-brand" to="/progress">
        Progress
      </Link>
    </nav>
  );
}

export default AppNav;

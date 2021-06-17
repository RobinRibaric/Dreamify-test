import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../context/Auth";

const Navbar = ({ history }) => {
  const activeTab = (history, path) => {
    if (history.location.pathname === path) return "active";
    return "";
  };

  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className="nav">
      {isAuthenticated() && (
        <Link className={`nav-link ${activeTab(history, "/")}`} to="/">
          Home
        </Link>
      )}
      {!isAuthenticated() && (
        <Link
          className={`nav-link ${activeTab(history, "/register")}`}
          to="/register"
        >
          Register
        </Link>
      )}

      {!isAuthenticated() && (
        <Link
          className={`nav-link ${activeTab(history, "/login")}`}
          to="/login"
        >
          Login
        </Link>
      )}
      {isAuthenticated() && (
        <span
          className="nav-link"
          style={{ cursor: "pointer", color: "black" }}
          onClick={() => {
            logout(() => {
              history.push("/");
            });
          }}
        >
          Logout
        </span>
      )}
    </div>
  );
};

export default withRouter(Navbar);

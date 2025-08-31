import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, getUser } from "../utils/auth";

const Navbar = ({ onSwitch }) => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        Todo App
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#menu"
        aria-controls="menu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="menu">
        <ul className="navbar-nav ms-auto align-items-center">
          {isAuthenticated() ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/tasks">
                  Tasks
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              {user?.role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin Panel
                  </Link>
                </li>
              )}
            </>
          ) : null}
        </ul>
      </div>

      {/* Auth buttons outside collapse */}
      <div className="d-flex">
        {isAuthenticated() ? (
          <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button
            className="btn btn-outline-light ms-2"
            onClick={() => onSwitch("login")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

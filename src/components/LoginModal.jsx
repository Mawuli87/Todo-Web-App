/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Assuming you are using react-toastify for notifications

export default function LoginModal({ show, onClose, onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(""); // For error message
  const navigate = useNavigate();

  if (!show) return null;

  const handleLogin = () => {
    setLoading(true);
    setError(""); // Clear previous errors

    axios
      .post("http://localhost/project/todo-backend/login", {
        email,
        password,
      })
      .then((response) => {
        // Assuming the response contains token and user data
        const { token, user } = response.data;

        // Store token and user data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Login successful!");

        // Redirect based on user role
        if (user.role === "admin") {
          navigate("/admin"); // Redirect to admin panel if admin
        } else {
          navigate("/tasks"); // Redirect to tasks page if normal user
        }
      })
      .catch((error) => {
        toast.error("Login failed! Invalid credentials.");
        setError("Invalid email or password.");
      })
      .finally(() => {
        setLoading(false); // Stop loading after request completes
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-content p-4">
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Close"
            onClick={onClose}
          />

          <h4 className="mb-3">Login</h4>

          {/* Email input */}
          <input
            className="form-control mb-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Handle email change
          />

          {/* Password input */}
          <div className="input-group mb-3">
            <input
              className="form-control"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handle password change
            />
            <button
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Login button */}
          <button
            className="btn btn-primary w-100 mb-3"
            onClick={handleLogin}
            disabled={loading} // Disable the button when loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Error message */}
          {error && <div className="text-danger">{error}</div>}

          {/* Switch to register or forgot password */}
          <div className="text-center">
            <a
              href="#"
              onClick={() => {
                onClose();
                onSwitch("register");
              }}
            >
              Register
            </a>{" "}
            |
            <a
              href="#"
              onClick={() => {
                onClose();
                onSwitch("forgot");
              }}
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

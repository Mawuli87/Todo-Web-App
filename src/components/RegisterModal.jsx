/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

export default function RegisterModal({ show, onClose, onSwitch }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register:", form);
    // Add axios call here
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-content p-4">
          <h4 className="mb-3">Register</h4>
          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-2"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              className="form-control mb-2"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              className="form-control mb-3"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn btn-success w-100 mb-2">
              Register
            </button>
            <button
              type="button"
              className="btn btn-secondary w-100 mb-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <div className="text-center">
              <a href="#" onClick={() => onSwitch("login")}>
                Already have an account? Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

export default function ForgotPasswordModal({ show, onClose, onSwitch }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset request for:", email);
    // Add axios call here
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-content p-4">
          <h4 className="mb-3">Forgot Password</h4>
          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-warning w-100 mb-2">
              Send Reset Link
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
                Back to Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

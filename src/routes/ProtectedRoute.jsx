import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../utils/auth"; // Assuming this path for auth utils

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const user = getUser(); // Get the user details from localStorage

  // If no token, redirect to login
  if (!token) return <Navigate to="/login" />;

  // If adminOnly is true and the user is not an admin, redirect to the dashboard
  if (adminOnly && (!user || user.role !== "admin")) {
    return <Navigate to="/dashboard" />;
  }

  return children; // Render the children (protected content)
};

export default ProtectedRoute;

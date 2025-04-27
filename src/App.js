// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import HomePage from "./pages/Home";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./routes/ProtectedRoute";

import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import ForgotPasswordModal from "./components/ForgotPasswordModal";

function App() {
  const [modal, setModal] = useState(null); // 'login', 'register', 'forgot'

  const handleClose = () => setModal(null);

  return (
    <Router>
      <ToastContainer />
      {/* Global Modals */}
      <LoginModal
        show={modal === "login"}
        onClose={handleClose}
        setModal={setModal}
      />
      <RegisterModal
        show={modal === "register"}
        onClose={handleClose}
        setModal={setModal}
      />
      <ForgotPasswordModal
        show={modal === "forgot"}
        onClose={handleClose}
        setModal={setModal}
      />

      <Routes>
        <Route path="/" element={<HomePage setModal={setModal} />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

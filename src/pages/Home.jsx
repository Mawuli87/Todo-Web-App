import React, { useState } from "react";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import Navbar from "../components/Navbar";
import { getUser } from "../utils/auth";

function HomePage() {
  const [modal, setModal] = useState(null); // 'login', 'register', 'forgot' or null

  const onSwitch = (name) => setModal(name); // centralized switch

  const token = localStorage.getItem("token"); //get token from local storage

  //get user data
  const user = getUser();

  return (
    <div className="home-page">
      <Navbar onSwitch={onSwitch} />

      <div className="container mt-4">
        <h4>What is React:</h4>
        <p>
          a JavaScript library used for building user interfaces, particularly
          for web applications. It's known for its component-based architecture,
          allowing developers to create reusable UI elements and manage their
          state effectively. While often referred to as a framework, it's
          actually a library focused on building the UI, leaving other aspects
          of application development to be handled by other tools and libraries.
        </p>

        {token ? (
          <button className="btn btn-outline-success btn-lg" disabled>
            {user.username} visit dashboard for your activities.
          </button>
        ) : (
          <button className="btn btn-success" onClick={() => setModal("login")}>
            Login to see tasks available
          </button>
        )}
      </div>

      <LoginModal
        show={modal === "login"}
        onClose={() => setModal(null)}
        onSwitch={onSwitch}
      />
      <RegisterModal
        show={modal === "register"}
        onClose={() => setModal(null)}
        onSwitch={onSwitch}
      />
      <ForgotPasswordModal
        show={modal === "forgot"}
        onClose={() => setModal(null)}
        onSwitch={onSwitch}
      />
    </div>
  );
}

export default HomePage;

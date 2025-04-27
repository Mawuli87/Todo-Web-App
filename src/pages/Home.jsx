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
        <h4>Company Description:</h4>
        <p>
          Dexwin Tech Ltd is a forward-thinking technology company dedicated to
          developing cutting-edge digital solutions that enhance user
          experiences. We are committed to creating seamless, user-friendly
          products that make an impact.
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

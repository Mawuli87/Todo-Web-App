import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "../src/styles/home.css"; // your main style file

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

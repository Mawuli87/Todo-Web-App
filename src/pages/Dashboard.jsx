// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getUser } from "../utils/auth";

const UserDashboard = () => {
  const [summary, setSummary] = useState(null);

  //get user data
  const user = getUser();

  //console.log("User dashboard " + JSON.stringify(summary));

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost/project/todo-backend/user-dashboard",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSummary(res.data.data);
    } catch (err) {
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!summary)
    return <div className="container mt-4">Loading dashboard...</div>;

  return (
    <div className="container mt-4">
      <h3>Welcome, {user.username} 👋</h3>
      <hr />

      <div className="row text-center mb-4">
        <div className="col-md-4">
          <div className="card bg-light p-3">
            <h5>Total Tasks</h5>
            <h2>{summary.total_tasks}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-white p-3">
            <h5>Accepted</h5>
            <h2>{summary.accepted_tasks}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white p-3">
            <h5>Completed</h5>
            <h2>{summary.completed_tasks}</h2>
          </div>
        </div>
      </div>

      <h4>Recent Tasks</h4>
      <ul className="list-group">
        {summary.recent_tasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between"
          >
            <div>
              <strong>{task.task_name}</strong> - <em>{task.status}</em>
            </div>
            <small>Deadline: {task.time_to_complete}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;

// src/pages/Tasks.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getUser } from "../utils/auth";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  //get user data
  const user = getUser();

  const fetchTasks = () => {
    axios
      .get("http://localhost/project/todo-backend/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.data.status) {
          setTasks(res.data.data);
        } else {
          toast.error(res.data.message || "Failed to load tasks");
        }
      })
      .catch(() => toast.error("Server error while loading tasks"));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const acceptTask = (taskId) => {
    axios
      .post(
        `http://localhost/project/todo-backend/accept-task?id=${taskId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        toast.success("Task accepted!");
        fetchTasks();
      })
      .catch(() => toast.error("Failed to accept task"));
  };

  const completeTask = (taskId) => {
    axios
      .post(
        `http://localhost/project/todo-backend/complete-task?id=${taskId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        toast.success("Task marked as completed!");
        fetchTasks();
      })
      .catch(() => toast.error("Failed to complete task"));
  };

  const getStatusBadge = (task) => {
    if (task.status === "completed") {
      return <span className="badge bg-success">Completed</span>;
    }
    if (task.status === "accepted") {
      return <span className="badge bg-warning text-dark">In Progress</span>;
    }
    return <span className="badge bg-secondary">Available</span>;
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Available Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">
                {task.task_name} {getStatusBadge(task)}
              </h5>
              <p className="card-text">{task.description}</p>
              <small>Deadline: {task.time_to_complete}</small>
              {task.assigned_username && (
                <div className="text-muted mt-2">
                  <small>Accepted by: {task.assigned_username}</small>
                </div>
              )}
              <div className="mt-3">
                {task.status === "available" ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => acceptTask(task.id)}
                  >
                    Accept Task
                  </button>
                ) : task.status === "accepted" ? (
                  task.assigned_username === { user }?.username ? (
                    <button
                      className="btn btn-success"
                      onClick={() => completeTask(task.id)}
                    >
                      Mark as Completed
                    </button>
                  ) : (
                    <button className="btn btn-outline-secondary" disabled>
                      Already Accepted by {task.assigned_username}
                    </button>
                  )
                ) : (
                  <button className="btn btn-outline-success" disabled>
                    Task Completed
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Tasks;

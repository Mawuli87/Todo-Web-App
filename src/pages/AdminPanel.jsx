// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AllTasks from "../components/admin/AllTasks";
import CompletedReports from "../components/admin/CompletedReports";
import UserManagement from "../components/admin/UserManagement";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("tasks");
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [taskRes, userRes, reportRes] = await Promise.all([
        axios.get("http://localhost/project/todo-backend/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost/project/todo-backend/all-users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost/project/todo-backend/completed-by-users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setTasks(taskRes.data.data);
      setUsers(userRes.data.data);
      setReports(reportRes.data);
    } catch (err) {
      toast.error("Failed to load admin data");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.get(
        `http://localhost/project/todo-backend/delete-user?id=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("User deleted");
      fetchAll();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.get(
        `http://localhost/project/todo-backend/delete-task?id=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Task deleted");
      fetchAll();
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Panel</h2>

      {/* Tab Navigation */}
      <div className="btn-group mb-4">
        <button
          className={`btn btn-outline-primary ${
            activeTab === "tasks" ? "active" : ""
          }`}
          onClick={() => setActiveTab("tasks")}
        >
          All Tasks
        </button>
        <button
          className={`btn btn-outline-success ${
            activeTab === "users" ? "active" : ""
          }`}
          onClick={() => setActiveTab("users")}
        >
          User Management
        </button>
        <button
          className={`btn btn-outline-info ${
            activeTab === "reports" ? "active" : ""
          }`}
          onClick={() => setActiveTab("reports")}
        >
          Completed Reports
        </button>
      </div>

      {/* {activeTab === "tasks" && (
        <AllTasks tasks={tasks} deleteTask={deleteTask} />
      )} */}
      {activeTab === "tasks" && (
        <AllTasks tasks={tasks} deleteTask={deleteTask} fetchAll={fetchAll} />
      )}

      {activeTab === "reports" && <CompletedReports reports={reports} />}
      {activeTab === "users" && (
        <UserManagement users={users} deleteUser={deleteUser} />
      )}
    </div>
  );
};

export default AdminPanel;

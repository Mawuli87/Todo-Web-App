// src/components/admin/AllTasks.tsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AllTasks = ({ tasks, deleteTask, fetchAll }) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [newTask, setNewTask] = useState({
    task_name: "",
    description: "",
    status: "available",
    time_to_complete: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEdit = (task) => {
    setEditingId(task.id);
    setFormData({ ...task });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost/project/todo-backend/update-task?id=${editingId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Task updated");
      setEditingId(null);
      fetchAll();
    } catch {
      toast.error("Failed to update task");
    }
  };

  const isValidTime = (time) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);

  const handleCreate = async () => {
    if (!newTask.task_name.trim()) return toast.error("Task name is required");
    if (!isValidTime(newTask.time_to_complete)) {
      return toast.error("Time must be in HH:MM format");
    }
    try {
      await axios.post(
        "http://localhost/project/todo-backend/create-task",
        newTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Task created successfully");
      setNewTask({
        task_name: "",
        description: "",
        status: "available",
        time_to_complete: "",
      });
      fetchAll();
    } catch {
      toast.error("Failed to create task");
    }
  };

  return (
    <div>
      <h4>All Tasks (Admin Editable)</h4>

      {/* Create Task Form */}
      <div className="card p-3 mb-3">
        <h5>Create New Task</h5>
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              name="task_name"
              placeholder="Task Name"
              value={newTask.task_name}
              onChange={(e) =>
                setNewTask({ ...newTask, task_name: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="time_to_complete"
              placeholder="Time To Complete"
              value={newTask.time_to_complete}
              onChange={(e) =>
                setNewTask({ ...newTask, time_to_complete: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <select
              name="status"
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
              className="form-select"
            >
              <option value="available">Available</option>
              <option value="accepted">Accepted</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100" onClick={handleCreate}>
              Create Task
            </button>
          </div>
        </div>
      </div>

      {/* Task Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Time To Complete</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) =>
            editingId === task.id ? (
              <tr key={task.id}>
                <td>
                  <input
                    name="task_name"
                    value={formData.task_name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
                <td>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="available">Available</option>
                    <option value="accepted">Accepted</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td>
                  <input
                    name="time_to_complete"
                    value={formData.time_to_complete}
                    onChange={handleChange}
                    className="form-control"
                  />
                </td>
                <td>
                  <button
                    onClick={handleSave}
                    className="btn btn-success btn-sm me-1"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={task.id}>
                <td>{task.task_name}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.time_to_complete}</td>
                <td>
                  <button
                    onClick={() => handleEdit(task)}
                    className="btn btn-primary btn-sm me-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllTasks;

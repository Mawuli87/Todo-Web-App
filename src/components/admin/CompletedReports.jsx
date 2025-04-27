import React from "react";

const CompletedReports = ({ reports }) => {
  return (
    <div>
      <h4>Completed Tasks Report</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User</th>
            <th>Task</th>
            <th>Completed At</th>
          </tr>
        </thead>
        <tbody>
          {reports.length ? (
            reports.map((r, index) => (
              <tr key={index}>
                <td>{r.username}</td>
                <td>{r.task_name}</td>
                <td>{new Date(r.completed_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No completed tasks
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedReports;

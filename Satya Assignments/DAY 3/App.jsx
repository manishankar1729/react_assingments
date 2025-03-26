import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [formData, setFormData] = useState({ name: "", age: "", height: "", email: "" });
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.age || !formData.height || !formData.email) {
      alert("All fields are required");
      return;
    }

    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormData({ name: "", age: "", height: "", email: "" });
      fetchUsers();
    }
  };

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">User Registration Form</h2>

      <div className="card shadow-lg p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input type="number" className="form-control" name="age" value={formData.age} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Height (cm)</label>
            <input type="number" className="form-control" name="height" value={formData.height} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Email ID</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>

      <h2 className="text-center text-success mt-5">Users List</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Height</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.height} cm</td>
                  <td>{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-danger">No Users Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import './App.css'; // Importing an external CSS file for styles

const App = () => {
  const [formData, setFormData] = useState({ name: "", age: "", address: "", phoneNumber: "" });
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.age || !formData.address || !formData.phoneNumber) {
      alert("All fields are required");
      return;
    }

    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormData({ name: "", age: "", address: "", phoneNumber: "" });
      fetchUsers();
    }
  };

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="app-container">
      <h2 className="header">User Registration Form</h2>

      <div className="card">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input type="text" className="form-input" name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Age</label>
            <input type="number" className="form-input" name="age" value={formData.age} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input type="text" className="form-input" name="address" value={formData.address} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="text" className="form-input" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>

      <h2 className="header">Users List</h2>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.address}</td>
                  <td>{user.phoneNumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-users">No Users Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;

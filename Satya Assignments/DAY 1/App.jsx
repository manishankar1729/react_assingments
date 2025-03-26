import React, { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Address</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>
                {user.address ? (
                  <div>
                    <strong>Street:</strong> {user.address.street}<br />
                    <strong>Suite:</strong> {user.address.suite}<br />
                    <strong>City:</strong> {user.address.city}<br />
                    <strong>Zipcode:</strong> {user.address.zipcode}
                  </div>
                ) : (
                  'N/A'
                )}
              </td>
              <td>
                {user.company ? (
                  <div>
                    <strong>Company Name:</strong> {user.company.name}<br />
                    <strong>Catchphrase:</strong> {user.company.catchPhrase}<br />
                    <strong>BS:</strong> {user.company.bs}
                  </div>
                ) : (
                  'N/A'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

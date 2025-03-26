import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getUsers } from '../services/api';

export default function DataTableComponent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchData();
  }, []);

  return (
    <TableContainer width="60%" component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {users[0] && Object.keys(users[0]).map((key) => (
              <TableCell key={key}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              {Object.values(user).map((value, i) => (
                <TableCell key={i}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
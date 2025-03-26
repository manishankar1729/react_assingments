import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

class DataGridDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      columns: [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'username', headerName: 'Username', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'website', headerName: 'Website', width: 150 },
        { field: 'city', headerName: 'City', width: 150 },
        { field: 'address', headerName: 'Address', width: 300 }, 
        { field: 'company', headerName: 'Company', width: 200 },
      ],
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();

    
      const rows = data.map((user) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        city: user.address.city, 
        address: `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`,
        company: user.company.name, 
      }));

      this.setState({ rows });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {
    const { rows, columns } = this.state;

    return (
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    );
  }
}

export default DataGridDemo;
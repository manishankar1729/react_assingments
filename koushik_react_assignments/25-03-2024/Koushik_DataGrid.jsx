import React, { Component } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

class StaticDataGrid extends Component {
    constructor() {
        super();
        this.state = {
            rows: [],
            columns: [],
        };
    }

    async componentDidMount() {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const fetchedData = await response.json();

        // Transform nested data into a flat structure
        const formattedData = fetchedData.map((user) => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            website: user.website,
            'address.street': user.address?.street || 'N/A',
            'address.suite': user.address?.suite || 'N/A',
            'address.city': user.address?.city || 'N/A',
            'address.zipcode': user.address?.zipcode || 'N/A',
            'geo.latitude': user.address?.geo?.lat || 'N/A',
            'geo.longitude': user.address?.geo?.lng || 'N/A',
            'company.title': user.company?.name || 'N/A',
            'company.tagline': user.company?.catchPhrase || 'N/A',
            'company.business': user.company?.bs || 'N/A',
        }));

        // Dynamically create column definitions
        const columnDefinitions = Object.keys(formattedData[0]).map((key) => ({
            field: key,
            headerName: key.replace('.', ' ').toUpperCase(),
            width: 160,
            editable: true,
        }));

        this.setState({ rows: formattedData, columns: columnDefinitions });
    }

    render() {
        const { rows, columns } = this.state;

        return (
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[25]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        );
    }
}

export default StaticDataGrid;

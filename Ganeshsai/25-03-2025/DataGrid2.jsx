import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default class DataGridDemo1 extends React.Component {
    constructor() {
        super();
        this.state = {
            rows: [],
            columns: [],
        };
    }

    async componentDidMount() {
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        let data = await response.json();

        const columns = [
            { field: 'id', headerName: 'ID', width: 100 },
            { field: 'name', headerName: 'Name', width: 150 },
            { field: 'username', headerName: 'Username', width: 150 },
            { field: 'email', headerName: 'Email', width: 200 },
            { field: 'phone', headerName: 'Phone', width: 150 },
            { field: 'website', headerName: 'Website', width: 150 },
            { field: 'addressStreet', headerName: 'Street', width: 200 },
            { field: 'addressSuite', headerName: 'Suite', width: 150 },
            { field: 'addressCity', headerName: 'City', width: 150 },
            { field: 'addressZipcode', headerName: 'Zipcode', width: 150 },
            { field: 'companyName', headerName: 'Company Name', width: 200 },
            { field: 'companyCatchPhrase', headerName: 'Catchphrase', width: 200 },
            { field: 'companyBs', headerName: 'BS', width: 200 },];

        // this.setState({ rows: data, columns });
        const rows = data.map(user => ({
            ...user,
            addressStreet: user.address.street,
            addressSuite: user.address.suite,
            addressCity: user.address.city,
            addressZipcode: user.address.zipcode,
            companyName: user.company.name,
            companyCatchPhrase: user.company.catchPhrase,
            companyBs: user.company.bs,
        }));
        this.setState({ rows, columns });
    }

    render() {
        const { rows, columns } = this.state;

        return (
            <Box sx={{ height: 400, width: '100%' }}>
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
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        );
    }
}

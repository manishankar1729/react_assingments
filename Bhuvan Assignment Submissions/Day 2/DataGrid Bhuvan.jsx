import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


export default class DataGridDemo extends React.Component {
    constructor() {
        super();
        this.state = {
            rows: [ ],
            columns: [ ]
        }
    }
    async componentDidMount() {
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        let data = await response.json();
        
        // Flatten nested fields
        const flattenData = data.map(user => {
            let flattenedUser = {};
            for (let key in user) {
                if (typeof user[key] === 'object' && user[key] !== null) {
                    for (let nestedKey in user[key]) {
                        
                        if (typeof user[key][nestedKey] === 'object' && user[key][nestedKey] !== null) {
                            for (let nestnestedKey in user[key][nestedKey]) {
                                flattenedUser[`${key}.${nestedKey}.${nestnestedKey}`] = user[key][nestedKey][nestnestedKey];
                            }}
                            
                        else {
                            flattenedUser[`${key}.${nestedKey}`] = user[key][nestedKey];
                        }
                    }
                } else {
                    flattenedUser[key] = user[key];
                }
            }
            return flattenedUser;
        });

        this.setState({ rows: flattenData });

        // Generate columns dynamically
        if (flattenData.length > 0) {
            const columns = Object.keys(flattenData[0]).map((propName) => ({
                field: propName,
                headerName: propName.toLocaleUpperCase(),
                width: 150,
                editable: true
            }));
            this.setState({ columns });
        }
    }
    render(){
        const {rows, columns} = this.state;
        return (
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel:{
                            pageSize: 5,}
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
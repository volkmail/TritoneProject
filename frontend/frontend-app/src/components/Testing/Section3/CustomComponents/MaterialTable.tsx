import * as React from 'react';
import { DataGrid, GridColumns, GridRowsProp } from '@material-ui/data-grid';

type PropsType = {
    tableColumns: GridColumns,
    tableRows: GridRowsProp
}

// const columns: GridColumns = [
//     { field: 'frequency', headerName: 'Lci', description:"dasdasdsadasdasd", editable: false},
//     { field: 'age', headerName: 'V(с+ш)i', type: 'number', editable: true },
// ];
//
// const rows: GridRowsProp = [
//     {
//         id: 1,
//         frequency: 15,
//         age: 25,
//     },
//     {
//         id: 2,
//         frequency: 15.5,
//         age: 36,
//     },
//     {
//         id: 3,
//         frequency: 1254.6,
//         age: 19,
//     },
// ];

const MaterialTable: React.FC<PropsType> = (props) => {
    return (
        <div style={{ height: "50vh", width: '100%' }}>
            <DataGrid
                disableColumnMenu={true}
                rows={props.tableRows}
                columns={props.tableColumns}
                // rowsPerPageOptions={[]}
            />
        </div>
    );
}

export default MaterialTable;
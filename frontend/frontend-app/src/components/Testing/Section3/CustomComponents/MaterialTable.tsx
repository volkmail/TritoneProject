import * as React from 'react';
import { DataGrid, GridColumns, GridRowsProp } from '@material-ui/data-grid';
import {useMemo, useRef} from "react";

type PropsType = {
    tableColumns: GridColumns,
    tableRows: GridRowsProp
}

function useApiRef() {
    const apiRef = useRef(null);
    const _columns = useMemo(
        () =>
            // @ts-ignore
            columns.concat({
                field: "__HIDDEN__",
                width: 0,
                renderCell: (params: any) => {
                    apiRef.current = params.api;
                    return null;
                }
            }),
        // @ts-ignore
        [columns]
    );

    return { apiRef, columns: _columns };
}

const MaterialTable: React.FC<PropsType> = (props) => {
    const { apiRef, columns } = useApiRef();

    return (
        <div style={{ height: "50vh", width: '100%' }}>
            <DataGrid
                disableColumnMenu={true}
                rows={props.tableRows}
                columns={props.tableColumns}
                hideFooter={true}
                // rowsPerPageOptions={[]}
            />
        </div>
    );
}

export default MaterialTable;
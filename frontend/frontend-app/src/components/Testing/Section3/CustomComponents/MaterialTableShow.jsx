import { useMemo, useRef } from "react";
// import "./styles.css";
import { Button, TextField } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
// import moment from "moment";

const columns = [
    {
        field: "Col1",
        headerName: "Col1",
        flex: 1.0,
        disableClickEventBubbling: true,
        sortable: false,
        disableColumnMenu: true
    },
    {
        field: "Col2",
        headerName: "Col2",
        flex: 1.0,
        disableClickEventBubbling: true,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => {
            return (
                <TextField
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                        params.api.updateRows([{ ...params.row, Col2: e.target.value }])
                    }
                />
            );
        }
    },
    {
        field: "Col3",
        headerName: "Col3",
        flex: 1.0,
        disableClickEventBubbling: true,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
            <TextField
                onChange={(e) =>
                    params.api.updateRows([{ ...params.row, Col3: e.target.value }])
                }
            />
        )
    }
];

const rows = [
    { id: 1, Col1: "col1 data", Col2: null, Col3: null },
    { id: 2, Col1: "col2 data", Col2: null, Col3: null },
    { id: 3, Col1: "col3 data", Col2: null, Col3: null }
];

function useApiRef() {
    const apiRef = useRef(null);
    const _columns = useMemo(
        () =>
            columns.concat({
                field: "__HIDDEN__",
                width: 0,
                renderCell: (params) => {
                    apiRef.current = params.api;
                    return null;
                }
            }),
        [columns]
    );

    return { apiRef, columns: _columns };
}

export default function TableShow() {
    const { apiRef, columns } = useApiRef();
    const handleClickButton = () => {
        console.log(apiRef.current.getRowModels());
    };

    return (
        <div className="App">
            <DataGrid
                density="compact"
                rows={rows}
                columns={columns}
                pageSize={25}
                autoHeight={true}
                hideFooter={true}
            />
            <Button variant="contained" color="primary" onClick={handleClickButton}>
                Show me grid data
            </Button>
        </div>
    );
}

import * as React from 'react';
import {DataGrid, GridColumns, GridEditCellPropsParams, GridRowsProp} from '@material-ui/data-grid';
import {useMemo} from "react";
import {CreateTableColumns, CreateTableRows} from "../../functions/PointTestFunctions";

type PropsType = {
    tableColumns: GridColumns,
    tableRows: GridRowsProp,
    WriteValueFromTable?: (valueData: GridEditCellPropsParams) => void
}

const StatisticTable: React.FC<PropsType> = (propsA) => {

    const handleEditCellChange = ({id, field, props}: GridEditCellPropsParams) => {
        propsA.WriteValueFromTable && propsA.WriteValueFromTable({id, field, props});
    }

    return (
        <div style={{height: "50vh", width: '100%'}}>
            <DataGrid
                disableColumnMenu={true}
                rows={propsA.tableRows}
                columns={propsA.tableColumns}
                hideFooter={true}
                onEditCellChangeCommitted={handleEditCellChange}
            />
        </div>
    );
}

export default StatisticTable;
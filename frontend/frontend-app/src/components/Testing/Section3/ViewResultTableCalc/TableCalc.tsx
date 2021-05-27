import React, {useEffect, useMemo, useRef} from "react";
import style from "./TableCalc.module.css"
import MaterialTable from "../CustomComponents/MaterialTable";
import {useSelector} from "react-redux";
import {GetSelectedVariables} from "../../../../redux/selectors/calc-selector";
import {GridColumns, GridRowsProp} from "@material-ui/data-grid";
import {VariableWithValuesType} from "../../../../types/generalTypes";
import {CreateTableColumns, CreateTableRows} from "../../../../functions/PointTestFunctions";

// function useApiRef() {
//     const apiRef = useRef(null);
//     const _columns = useMemo(
//         () =>
//             // @ts-ignore
//             columns.concat({
//                 field: "__HIDDEN__",
//                 width: 0,
//                 renderCell: (params: any) => {
//                     apiRef.current = params.api;
//                     return null;
//                 }
//             }),
//         // @ts-ignore
//         [columns]
//     );
//
//     return { apiRef, columns: _columns };
// }

const TableCalc = (props:{stepNumber:number}) => {
    // const { apiRef, columns } = useApiRef();
    const variables: VariableWithValuesType[] = useSelector(GetSelectedVariables);
    const tableColumns: GridColumns = CreateTableColumns(variables);
    const tableRows: GridRowsProp = CreateTableRows(variables);



    // const OnCheckButtonHandler = () => {
    //     // @ts-ignore
    //     console.log(apiRef.current.getRowModels());
    // }
    // useEffect(()=>{
    //     if(variables && variables.length === 6){
    //         tableColumns = CreateTableColumns(variables);
    //         tableRows = CreateTableRows(variables);
    //     }
    // },[variables])

    return(
        <div className={style.TableContainer}>
            <MaterialTable tableColumns={tableColumns} tableRows={tableRows}/>
            <button className="button_classic">Завершить этап</button>
        </div>
    )
}

export default TableCalc;
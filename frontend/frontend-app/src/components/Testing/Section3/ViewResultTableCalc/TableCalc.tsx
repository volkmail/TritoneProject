import React, {useEffect} from "react";
import style from "./TableCalc.module.css"
import MaterialTable from "../CustomComponents/MaterialTable";
import {useSelector} from "react-redux";
import {GetSelectedVariables} from "../../../../redux/selectors/calc-selector";
import {GridColumns, GridRowsProp} from "@material-ui/data-grid";
import {VariableWithValuesType} from "../../../../types/generalTypes";
import {CreateTableColumns, CreateTableRows} from "../../../../functions/PointTestFunctions";

const TableCalc = (props:{stepNumber:number}) => {
    const variables: VariableWithValuesType[] = useSelector(GetSelectedVariables);
    const tableColumns: GridColumns = CreateTableColumns(variables);
    const tableRows: GridRowsProp = CreateTableRows(variables);

    const OnCheckButtonHandler = () => {

    }
    // useEffect(()=>{
    //     if(variables && variables.length === 6){
    //         tableColumns = CreateTableColumns(variables);
    //         tableRows = CreateTableRows(variables);
    //     }
    // },[variables])

    return(
        <div className={style.TableContainer}>
            <MaterialTable tableColumns={tableColumns} tableRows={tableRows}/>
            <button className="button_classic" onClick={OnCheckButtonHandler}>Завершить этап</button>
        </div>
    )
}

export default TableCalc;
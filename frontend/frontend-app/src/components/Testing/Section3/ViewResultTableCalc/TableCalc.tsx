import React, {useCallback, useEffect, useMemo, useState} from "react";
import style from "./TableCalc.module.css"
import MaterialTable from "../CustomComponents/MaterialTable";
import {useDispatch, useSelector} from "react-redux";
import {GetSelectedVariables} from "../../../../redux/selectors/calc-selector";
import {GridColumns, GridEditCellPropsParams, GridRowsProp} from "@material-ui/data-grid";
import {VariableWithValuesType} from "../../../../types/generalTypes";
import {CheckCalculations, CreateTableColumns, CreateTableRows} from "../../../../functions/PointTestFunctions";
import SuccessDialog from "../CustomComponents/SuccessDialog";
import MistakeDialog from "../CustomComponents/MistakeDialog";
import {SetSectionComplete} from "../../../../redux/ThunkCreators/testingThunks";

const TableCalc = (props: { stepNumber: number }) => {
    const variables: VariableWithValuesType[] = useSelector(GetSelectedVariables);
    const [isAutoFill, SetAutoFill] = useState<boolean>(false);
    const [isFinish, SetIsFinish] = useState<boolean>(false);
    const [isMistake, SetIsMistake] = useState<boolean>(false);
    const tableColumns: GridColumns = useMemo(() => CreateTableColumns(variables), [variables]);
    const tableRows: GridRowsProp = useMemo(() => CreateTableRows(variables, isAutoFill), [variables, isAutoFill]);
    const [calculatedVariables, SetCalculatedVariables] = useState<{ [p: string]: Array<number> }>({
        delta: new Array<number>(11).fill(0, 0, 11),
        isolationValues: new Array<number>(11).fill(0, 0, 11)
    });
    const dispatch = useDispatch();

    useEffect(()=>{
        if(isFinish){
            dispatch(SetSectionComplete(3));
        }
    },[isFinish])

    const WriteValueFromTable = useCallback((valueData: GridEditCellPropsParams) => {
        SetCalculatedVariables(prevSate => {
            let values = [...prevSate[valueData.field as string]];
            values.splice((valueData.id as number) - 1, 1, valueData.props.value as number);

            return {...prevSate, [valueData.field as string]: [...values]}
        });
    }, []);

    const OnCheckButtonHandler = () => {
        CheckCalculations(variables, calculatedVariables) ? SetIsFinish(true) : SetIsMistake(true);
    }

    const OnFillAnswersButtonHandler = () => {
        let rightDelta: Array<number> = variables.find(el => el.valuesName === "delta")!.values;
        let rightIsolationValues: Array<number> = variables.find(el => el.valuesName === "isolationValues")!.values;
        SetCalculatedVariables(calculatedVariables => {
            return {
                ...calculatedVariables,
                ["delta"]: rightDelta,
                ["isolationValues"]: rightIsolationValues,
            }
        });
        SetAutoFill(true);
    }

    return (
        isFinish ? <SuccessDialog stepNumber={props.stepNumber} SetIsFinish={SetIsFinish}/>
            : isMistake ? <MistakeDialog SetIsMistake={SetIsMistake}/>
            :<div className={style.TableContainer}>
                <MaterialTable tableColumns={tableColumns} tableRows={tableRows} WriteValueFromTable={WriteValueFromTable}/>
                <button className="button_classic" onClick={OnCheckButtonHandler}>Завершить этап</button>
                <button className="button_classic" onClick={OnFillAnswersButtonHandler}>Заполнить ответы</button>
            </div>
    )
}

export default TableCalc;
import React, {useState} from "react";
import style from "./ChoseColumns.module.css";
import {useDispatch, useSelector} from "react-redux";
import {GetVariables} from "../../../../redux/selectors/appData-selector";
import SimpleSelect from "../CustomComponents/MaterialSelect";
import {GetRightVariables} from "../../../../redux/selectors/calc-selector";
import {SetSelectedVariables, SetStep4CalcType} from "../../../../redux/ActionCreators/CalcActionsCreators";
import {CheckRightStep3} from "../../../../functions/PointTestFunctions";
import SuccessDialog from "../CustomComponents/SuccessDialog";
import MistakeDialog from "../CustomComponents/MistakeDialog";

type PropsType = {
    stepNumber: number
}

const ChoseColumns: React.FC<PropsType> = (props) => {
    const Variables = useSelector(GetVariables);
    const RightVariables = useSelector(GetRightVariables);
    const [FreeVariables, SetFreeVariables] = useState<typeof Variables>([...Variables]);
    const [TableVariables, SetTableVariables] = useState<typeof Variables>([]);
    const [isAcoustic, SetIsAcoustic] = useState<number>(1);
    const [isFinish, SetIsFinish] = useState<boolean>(false);
    const [isMistake, SetIsMistake] = useState<boolean>(false);

    const dispatch = useDispatch();
    const parser = new DOMParser();

    const OnSelectChangeHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
        if (parseInt(event.target.value as string) !== isAcoustic) {
            SetIsAcoustic(parseInt(event.target.value as string));
            SetFreeVariables([...Variables]);
            SetTableVariables([]);
        }
    }

    const onVariableAddHandler = (event: React.MouseEvent<HTMLParagraphElement>) => {
        let selectId: number = parseInt(event.currentTarget.id);
        if (FreeVariables.some(el => el.id === selectId)) {
            let FreeVariablesTemp = [...FreeVariables];
            let newTableVariables = [...TableVariables, FreeVariables[FreeVariables.findIndex(elem => elem.id === selectId)]];

            FreeVariablesTemp.splice(FreeVariables.findIndex(elem => elem.id === selectId), 1);

            SetTableVariables([...newTableVariables]);
            SetFreeVariables([...FreeVariablesTemp]);
        } else {
            let TableVariablesTemp = [...TableVariables];
            let newFreeVariables = [...FreeVariables, TableVariables[TableVariables.findIndex(elem => elem.id === selectId)]];

            TableVariablesTemp.splice(TableVariables.findIndex(elem => elem.id === selectId), 1);

            SetTableVariables([...TableVariablesTemp]);
            SetFreeVariables([...newFreeVariables]);
        }
    }

    const OnCheckButtonHandler = () => {
        let isSuccess = false;
        switch (isAcoustic) {
            case 1: {
                isSuccess = CheckRightStep3(RightVariables.Acoustic, TableVariables);
                break;
            }
            case 0: {
                isSuccess = CheckRightStep3(RightVariables.Vibro, TableVariables);
                break;
            }
        }
        if (isSuccess) {
            SetIsFinish(true);
            dispatch(SetStep4CalcType(isAcoustic));
            dispatch(SetSelectedVariables(TableVariables));
        } else {
            SetIsMistake(true);
            SetFreeVariables([...Variables]);
            SetTableVariables([]);
        }
    }

    return (
        isFinish ? <SuccessDialog stepNumber={props.stepNumber} SetIsFinish={SetIsFinish}/>
            : isMistake ? <MistakeDialog SetIsMistake={SetIsMistake}/>
            : <div className={style.choseContainer}>
                <div className={style.calcTypeChose}>
                    <p>Выберете тип расчетов</p>
                    <SimpleSelect
                        isAcoustic={isAcoustic}
                        OnSelectChangeHandler={OnSelectChangeHandler}
                    />
                </div>
                <div className={style.chosePlayground}>
                    <div className={style.columnsStack}>
                        <p>Доступные колонки</p>
                        <div>
                            {FreeVariables.length > 0 && FreeVariables.map(el =>
                                <p id={`${el.id}`} onClick={onVariableAddHandler}>
                                    {parser.parseFromString('<!doctype html><body>' + el.variableName, 'text/html').body.textContent}
                                    <sub id={`${el.id}`}>{el.variableDownIndex}</sub>
                                </p>)}
                        </div>
                    </div>
                    <div className={style.columnsStack}>
                        <p>Колонки в таблице</p>
                        <div>
                            {TableVariables.length > 0 && TableVariables.map(el =>
                                <p id={`${el?.id}`} onClick={onVariableAddHandler}>
                                    {parser.parseFromString('<!doctype html><body>' + el?.variableName, 'text/html').body.textContent}
                                    <sub>{el?.variableDownIndex}</sub>
                                </p>)}
                        </div>
                    </div>
                </div>
                <button className="button_classic" onClick={OnCheckButtonHandler}>Завершить этап</button>
            </div>
    )
}

export default ChoseColumns;
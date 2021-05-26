import React, {MouseEvent, useState} from "react";
import {DataSetTypeForViewResult, signalKeys, signalTypes, signalTypesString} from "../../../../types/generalTypes";
import style from "../ViewResult.module.css";
import {Redirect, useLocation, useParams} from "react-router-dom";
import {boolean} from "yup";
import {useDispatch, useSelector} from "react-redux";
import {AddSignalValuesToStep4} from "../../../../redux/ActionCreators/CalcActionsCreators";
import {GetMeasureTypeById} from "../../../../functions/PointTestFunctions";
import {GetDataSetSignalLevelMax} from "../../../../redux/selectors/calc-selector";

type PropsType = {
    checkBoxState: {
        signalLevelMax: boolean,
        signalLevel: boolean,
        signalLevelMin: boolean
    },
    setCurrentSignalLevel: React.Dispatch<React.SetStateAction<signalKeys>>,
    setCheckBoxState: React.Dispatch<React.SetStateAction<{ signalLevelMax: boolean, signalLevel: boolean, signalLevelMin: boolean }>>
}
type useParamsType = {
    pointName: string,
    typeId: string
}
const PanelControl: React.FC<PropsType> = (props) => {
    const {pointName, typeId} = useParams<useParamsType>();
    const [isDone, setIsDone] = useState<boolean>(false);
    const SignalLevelMax = useSelector(GetDataSetSignalLevelMax);
    const dispatch = useDispatch();

    const checkBoxHandler = (event: MouseEvent<HTMLInputElement>) => {
        let newCheckBoxState = {
            signalLevelMax: false,
            signalLevel: false,
            signalLevelMin: false
        };

        for (let key in props.checkBoxState) {
            if (key === event.currentTarget.name) {
                props.setCheckBoxState({...newCheckBoxState, [key]: true});

                switch (key) {
                    case signalKeys.signalLevelMax:
                        props.setCurrentSignalLevel(signalKeys.signalLevelMax);
                        break;
                    case signalKeys.signalLevel:
                        props.setCurrentSignalLevel(signalKeys.signalLevel);
                        break;
                    case signalKeys.signalLevelMin:
                        props.setCurrentSignalLevel(signalKeys.signalLevelMin);
                        break;
                }
                break;
            }
        }
    }

    const buttonSaveClickHandler = () => {
        if (sessionStorage.getItem("currentMeasureSequence")) {
            let currentMeasureSequenceArray: Array<number> = JSON.parse(sessionStorage.getItem("currentMeasureSequence")!);
            sessionStorage.setItem("currentMeasureSequence", JSON.stringify([...currentMeasureSequenceArray, parseInt(typeId)]));
            dispatch(AddSignalValuesToStep4(signalTypesString[GetMeasureTypeById(parseInt(typeId)) as signalTypesString],
                SignalLevelMax!))
        } else {
            sessionStorage.setItem("currentMeasureSequence", JSON.stringify([parseInt(typeId)]));
            dispatch(AddSignalValuesToStep4(
                signalTypesString[GetMeasureTypeById(parseInt(typeId)) as signalTypesString],
                SignalLevelMax!))
        }

        setIsDone(true);
    }

    return (
        isDone
            ? <Redirect to={`/testing/viewPoints/Point/${pointName}`}/>
            : <div className={style.viewer_panel}>
                <div className={style.levelControl}>
                    <p>Уровень</p>
                    <label>
                        <input name="signalLevelMax" type="checkbox" checked={props.checkBoxState.signalLevelMax}
                               onClick={checkBoxHandler}/>
                        Макс.
                    </label>
                    <label>
                        <input name="signalLevelMin" type="checkbox" checked={props.checkBoxState.signalLevelMin}
                               onClick={checkBoxHandler}/>
                        Мин.
                    </label>
                    <label>
                        <input name="signalLevel" type="checkbox" checked={props.checkBoxState.signalLevel}
                               onClick={checkBoxHandler}/>
                        Текущий
                    </label>
                </div>
                <button className="button_classic" onClick={buttonSaveClickHandler}>Сохранить результаты<p>(результаты
                    сохраняются по Макс. уровню)</p></button>
            </div>
    )
}

export default PanelControl;
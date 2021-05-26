import React from "react";
import style from "./ViewResultPoints.module.css";
import {useDispatch} from "react-redux";
import {ResetSignalValuesToStep4} from "../../../../redux/ActionCreators/CalcActionsCreators";

type PropsType = {
    currentMeasures: Array<string> | null | undefined,
    SetCurrentMeasures: React.Dispatch<React.SetStateAction<string[] | null | undefined>>
}

const ChosenTypes = (props:PropsType)=>{
    const dispatch = useDispatch();

    const resetMeasuresHandler = () => {
        props.SetCurrentMeasures(null);
        sessionStorage.getItem("currentMeasureSequence") && sessionStorage.removeItem("currentMeasureSequence");
        dispatch(ResetSignalValuesToStep4());
    }

    return(
        <div className={style.chooseTypes}>
            <p style={{backgroundColor: "transparent"}}>Проведенные измерения:</p>
            {props.currentMeasures
                ?props.currentMeasures.map((el: string, index: number)=><p>{`${index+1}) ${el}`}</p>)
                :<p>Не проведено не одно измерение</p>
            }
            <div>
                <button className="button_classic" onClick={resetMeasuresHandler}>Сбросить измерения</button>
            </div>
        </div>
    )
}

export default ChosenTypes;
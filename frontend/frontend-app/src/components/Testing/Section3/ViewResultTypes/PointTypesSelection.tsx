import React, {useCallback, useEffect, useState} from "react";
import style from "../ViewResultPoints/ViewResultPoints.module.css";
import {NavLink, Redirect, useHistory, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {SetNextStep, SetStepComplete} from "../../../../redux/ActionCreators/CalcActionsCreators";
import {GetChosenTypes} from "../../../../functions/PointTestFunctions";
import ChosenTypes from "../ViewResultPoints/ChosenTypes";
import SuccessDialog from "../CustomComponents/SuccessDialog";
import MistakeDialog from "../CustomComponents/MistakeDialog";

type useParamsType = {
    pointId: string
}

const PointTypesSelection = (props: any) => {
    let {pointId} = useParams<useParamsType>();
    const history = useHistory();
    const [isFinish, SetIsFinish] = useState<boolean>(false);
    const [isMistake, SetIsMistake] = useState<boolean>(false);
    const [currentMeasures, SetCurrentMeasures] = useState<Array<string>|null>();
    const dispatch = useDispatch();

    useEffect(()=>{
        SetCurrentMeasures(GetChosenTypes());
    },[GetChosenTypes])

    const checkStepRight = () => {
        let success = true;
        if(sessionStorage.getItem("currentMeasureSequence")){
            let currentMeasureSequenceArray: Array<number> = JSON.parse(sessionStorage.getItem("currentMeasureSequence")!);
            switch (props.stepNumber){
                case 1:{
                    if(currentMeasureSequenceArray.length !== 4)
                        success = false;
                    break;
                }
                case 2:{
                    if(currentMeasureSequenceArray.length !== 3)
                        success = false;
                    break;
                }
            }
            if(success){
                for(let i=0;i<currentMeasureSequenceArray.length;i++){
                    if(currentMeasureSequenceArray[i] !== i+1){
                        success = false;
                        break;
                    }
                }
            }
        }else{
            success = false;
        }
        if(success){
            sessionStorage.removeItem("currentMeasureSequence");
            SetCurrentMeasures(null);
            SetIsFinish(true);
        }else{
            sessionStorage.removeItem("currentMeasureSequence");
            SetCurrentMeasures(null);
            SetIsMistake(true);
        }

    }

    const returnButtonClick = () =>{
        history.push("/testing/viewPoints");
    }

    return (
        isFinish? <SuccessDialog stepNumber={props.stepNumber} SetIsFinish={SetIsFinish}/>
        : isMistake ? <MistakeDialog SetIsMistake={SetIsMistake}/>
        :<>
            <button className={style.historyBackButton} onClick={returnButtonClick}>Вернуться к выбору конструкции</button>
            <div className={style.pointSelectionContainer}>
                <ChosenTypes
                    currentMeasures={currentMeasures}
                    SetCurrentMeasures={SetCurrentMeasures}
                />
                <div className={style.pointSelectionContent}>
                    <div className={style.pointSelectionGrid}>
                        <div id= "1" className={style.grid_types}>
                            <NavLink to={"/testing/viewPoints/Point/"+pointId+"/Measure/1"}>Измерение тест-сигнала</NavLink>
                        </div>
                        <div id= "2" className={style.grid_types}>
                            <NavLink to={"/testing/viewPoints/Point/"+pointId+"/Measure/2"}>Измерение информативного сигнала и фона</NavLink>
                        </div>
                        <div id= "3" className={style.grid_types}>
                            <NavLink to={"/testing/viewPoints/Point/"+pointId+"/Measure/3"}>Измерение фона</NavLink>
                        </div>
                        <div id= "4" className={style.grid_types}>
                            <NavLink to={"/testing/viewPoints/Point/"+pointId+"/Measure/4"}>Измерение помехи</NavLink>
                        </div>
                    </div>
                    <button className="button_classic" onClick={checkStepRight}>Завершить выполнения этапа</button>
                </div>
            </div>
        </>
    )
}

export default PointTypesSelection;
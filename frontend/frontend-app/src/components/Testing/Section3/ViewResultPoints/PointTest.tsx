import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import style from "./ViewResultPoints.module.css";
import {useDispatch, useSelector} from "react-redux";
import {ClearDataSet} from "../../../../redux/ActionCreators/CalcActionsCreators";
import {GetCurrentPointInfo, GetPointProgress} from "../../../../redux/selectors/calc-selector";
import PointTypesSelection from "../ViewResultTypes/PointTypesSelection";
import ChoseColumns from "../ViewResultChoseColumns/ChoseColumns";
import TableCalc from "../ViewResultTableCalc/TableCalc";
import SuccessPointDialog from "../CustomComponents/SuccessPointDialog";

type useParamsType = {
    pointId: string
}

type CurrentStepType = {
    id: number,
    stepTitle: string,
    isAcoustic?: boolean,
    measureSequence?: Array<number>
    frequency?: Array<number>,
    testValues?: Array<number>,
    signalValues?: Array<number>,
    backValues?: Array<number>,
    delta?: Array<number>,
    isolationValues?: Array<number>,
    isComplete?: boolean,
    rightAcousticSequence?: Array<number>,
    rightVibroSequence?: Array<number>,
} | null

const GetStepContent = (stepNumber: number, props: any = null) => {
    if(stepNumber > 0 && stepNumber < 5) {
        switch (stepNumber) {
            case 1:
                return <PointTypesSelection stepNumber={stepNumber}/>
            case 2:
                return <PointTypesSelection stepNumber={stepNumber}/>
            case 3:
                return <ChoseColumns stepNumber={stepNumber}/>
            case 4:
                return <TableCalc stepNumber={stepNumber}/>
        }
    } else {
        return <SuccessPointDialog/> // TODO: Сделать красиво
    }
}

const PointTest = () => {
    let {pointId} = useParams<useParamsType>();
    const currentPointInfo = useSelector(GetCurrentPointInfo(parseInt(pointId))); // инфа о констрцкии и о выполнении замеров на ней TODO:УБРАТЬ ЕГО
    const pointProgress = useSelector(GetPointProgress); //инфа о прохождении измерении и расчетов на конструкции
    const [currentStep, setCurrentStep] = useState<CurrentStepType>(null); //инфа о текущем этапе
    const dispatch = useDispatch();

    //очищаем наборы данных измерений
    useEffect(()=>{
        dispatch(ClearDataSet());
    },[])

    //изменение текущего шага в локальном стейте
    useEffect(()=>{
        if(pointProgress){
            if(pointProgress.currentStep > 0 && pointProgress.currentStep < 5){
                switch (pointProgress.currentStep){
                    case 1:
                        setCurrentStep(pointProgress.step1);
                        break;
                    case 2:
                        setCurrentStep(pointProgress.step2);
                        break;
                    case 3:
                        setCurrentStep(pointProgress.step3);
                        break;
                    case 4:
                        setCurrentStep(pointProgress.step4);
                        break;
                }
            }
            else{
                pointProgress.isComplete = true;
            }
        }
    },[pointProgress.currentStep])

    return (
        <div className={style.container}>
            <div className={style.title}>
                <p>{`${currentStep?.stepTitle} ${currentStep?.isAcoustic !== undefined ? currentStep.isAcoustic ? "звукоизоляции" : "виброизоляции" : ""}`}</p>
                <p>Тип конструкции: {currentPointInfo?.pointTitle}.</p>
            </div>
            {GetStepContent(pointProgress.currentStep)}
        </div>
    )
}

export default PointTest;
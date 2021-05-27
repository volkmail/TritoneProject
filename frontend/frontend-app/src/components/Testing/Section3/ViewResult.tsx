import React, {useEffect, useState} from "react";
import style from "./ViewResult.module.css"
import {useDispatch, useSelector} from "react-redux";
import {GetDataSet} from "../../../redux/ThunkCreators/testingThunks";
import {signalKeys, signalTypes} from "../../../types/generalTypes";
import PanelControl from "./CustomComponents/PanelControl";
import MyBarChar from "./CustomComponents/CustomBarChar";
import {useParams} from "react-router-dom";
import {GetCurrentPointInfo, GetDataSetSelector} from "../../../redux/selectors/calc-selector";
import {ChangeSignalLevel} from "../../../redux/ActionCreators/CalcActionsCreators";
import {
    GetMeasureTypeByIdRussian,
    GetPointNameTranslation
} from "../../../functions/PointTestFunctions";

const initialCheckBoxState = {
    signalLevelMax: false,
    signalLevel: true,
    signalLevelMin: false
};

type useParamsType = {
    pointId: string,
    typeId: string
}

const ViewResult = () => {
    let {pointId, typeId} = useParams<useParamsType>()
    const currentPointInfo = useSelector(GetCurrentPointInfo(parseInt(pointId)));
    const dataSet = useSelector(GetDataSetSelector);
    const [currentSignalLevel, setCurrentSignalLevel] = useState(signalKeys.signalLevel);
    const [checkBoxState, setCheckBoxState] = useState(initialCheckBoxState);

    const myDispatch = useDispatch();


    useEffect(()=>{
        if(currentPointInfo){
            let typeName: string = "";
            switch(parseInt(typeId)){
                case signalTypes.Test:
                    typeName="Test";
                    break;
                case signalTypes.Signal:{
                    typeName="Signal";
                    break;
                }
                case signalTypes.Back:{
                    typeName="Back";
                    break;
                }
                case signalTypes.SAZ:{
                    typeName="SAZ";
                    break;
                }
            }

            /Floor|Wall|Ceiling/.test(currentPointInfo.pointName)
                ? myDispatch(GetDataSet("FWC"+typeName))
                : myDispatch(GetDataSet(currentPointInfo.pointName+typeName));
        }

    },[myDispatch, currentPointInfo])

    useEffect(()=>{
        const intervalId = setInterval(() => {
            myDispatch(ChangeSignalLevel());
        }, 1500);

        return () => clearInterval(intervalId);
    },[myDispatch])

    return(
        <div className={style.viewer_container}>
            <div className={style.viewer_title}>
                <p>{GetMeasureTypeByIdRussian(parseInt(typeId))}</p>
                <p>Тип конструкции: {currentPointInfo?.pointTitle}</p>
            </div>
            <div className={style.viewer_field}>
                <PanelControl
                    checkBoxState = {checkBoxState}
                    setCheckBoxState = {setCheckBoxState}
                    setCurrentSignalLevel = {setCurrentSignalLevel}
                />
                <MyBarChar dataSet={dataSet} currentSignalLevel={currentSignalLevel}/>
            </div>
        </div>
    )
}

export default ViewResult;
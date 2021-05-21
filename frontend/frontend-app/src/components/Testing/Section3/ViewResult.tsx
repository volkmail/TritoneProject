import React, {useEffect, useState} from "react";
import style from "./ViewResult.module.css"
import {useDispatch, useSelector} from "react-redux";
import {GetDataSet} from "../../../redux/ThunkCreators/testingThunks";
import {signalKeys} from "../../../types/generalTypes";
import PanelControl from "./CustomComponents/PanelControl";
import MyBarChar from "./CustomComponents/CustomBarChar";
import {useParams} from "react-router-dom";
import {GetDataSetSelector} from "../../../redux/selectors/calc-selector";
import {ChangeSignalLevel} from "../../../redux/ActionCreators/CalcActionsCreators";

const initialCheckBoxState = {
    signalLevelMax: false,
    signalLevel: true,
    signalLevelMin: false
};

type useParamsType = {
    pointName: string,
    typeName: string
}

const ViewResult = () => {
    const dataSet = useSelector(GetDataSetSelector);
    const [currentSignalLevel, setCurrentSignalLevel] = useState(signalKeys.signalLevel);
    const [checkBoxState, setCheckBoxState] = useState(initialCheckBoxState);

    const myDispatch = useDispatch();
    let {pointName, typeName} = useParams<useParamsType>()

    useEffect(()=>{
        /Floor|Wall|Ceiling/.test(pointName)
            ? myDispatch(GetDataSet("FWC"+typeName))
            : myDispatch(GetDataSet(pointName+typeName));
    },[myDispatch])

    useEffect(()=>{
        const intervalId = setInterval(() => {
            myDispatch(ChangeSignalLevel());
        }, 1500);

        return () => clearInterval(intervalId);
    },[myDispatch])

    return(
        <div className={style.viewer_container}>
            <div className={style.viewer_title}>
                <h1>Просмотр результатов снятия сигнала</h1>
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
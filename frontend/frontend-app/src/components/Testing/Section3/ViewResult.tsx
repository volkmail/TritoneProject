import React, {MouseEvent, useEffect, useState} from "react";
import style from "./ViewResult.module.css"
import {useDispatch, useSelector} from "react-redux";
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis,} from "recharts";
import {GetDataSetSelector} from "../../../redux/selectors/testing-selector";
import {GetDataSet} from "../../../redux/ThunkCreators/testingThunks";
import CustomTooltip from "./CustomTooltip";
import {signalKeys} from "../../../types/generalTypes";
import {ChangeSignalLevel} from "../../../redux/ActionCreators/TestingActionCreators";

const initialCheckBoxState = {
    signalLevelMax: true,
    signalLevel: false,
    signalLevelMin: false
};

const ViewResult = () => {
    const dataSet = useSelector(GetDataSetSelector);
    const [currentSignalLevel, setCurrentSignalLevel] = useState(signalKeys.signalLevelMax);
    const [checkBoxState, setCheckBoxState] = useState(initialCheckBoxState);

    const myDispatch = useDispatch();

    useEffect(()=>{
        myDispatch(GetDataSet());
    },[myDispatch])

    useEffect(()=>{
        const intervalId = setInterval(() => {
            myDispatch(ChangeSignalLevel());
        }, 1500);

        return () => clearInterval(intervalId);
    },[myDispatch])

    const checkBoxHandler = (event: MouseEvent<HTMLInputElement>) => {
        let newCheckBoxState = {
            signalLevelMax: false,
            signalLevel: false,
            signalLevelMin: false
        };

        for (let key in checkBoxState){
            if(key === event.currentTarget.name) {
                setCheckBoxState({...newCheckBoxState, [key]: true});

                switch (key) {
                    case signalKeys.signalLevelMax:
                        setCurrentSignalLevel(signalKeys.signalLevelMax);
                        break;
                    case signalKeys.signalLevel:
                        setCurrentSignalLevel(signalKeys.signalLevel);
                        break;
                    case signalKeys.signalLevelMin:
                        setCurrentSignalLevel(signalKeys.signalLevelMin);
                        break;
                }
                break;
            }
        }
    }

    return(
        <div className={style.viewer_container}>
            <div className={style.viewer_title}>
                <h1>Просмотр результатов снятия сигнала</h1>
            </div>
            <div className={style.viewer_field}>
                <div className={style.viewer_panel}>
                    <div className={style.levelControl}>
                        <p>Уровень</p>
                        <label>
                            <input name="signalLevelMax" type="checkbox" checked={checkBoxState.signalLevelMax}
                                   onClick={checkBoxHandler}/>
                            Макс.
                        </label>
                        <label>
                            <input name="signalLevelMin" type="checkbox" checked={checkBoxState.signalLevelMin}
                                   onClick={checkBoxHandler}/>
                            Мин.
                        </label>
                        <label>
                            <input name="signalLevel" type="checkbox" checked={checkBoxState.signalLevel}
                                   onClick={checkBoxHandler}/>
                            Текущий
                        </label>
                    </div>
                    <button className="button_classic">Сохранить результаты</button>
                </div>
                <div className={style.viewer_diagram}>
                    <BarChart
                        width={1200}
                        height={650}
                        data={dataSet as any[]}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="frequency" tickMargin={10}/>
                        <YAxis />
                        <Tooltip content={<CustomTooltip currentSignalLevel={currentSignalLevel}/>}/>
                        <Bar dataKey={currentSignalLevel} fill="#8ed78e" isAnimationActive={true}/>
                    </BarChart>
                </div>
            </div>
        </div>
    )
}

export default ViewResult;
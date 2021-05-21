import React from "react";
import style from "../ViewResult.module.css"
import {signalKeys} from "../../../../types/generalTypes";

const GetSignalLevel = (currentSignalLevel, payload) => {
    switch (currentSignalLevel){
        case signalKeys.signalLevelMax:
            return payload.signalLevelMax;
        case signalKeys.signalLevel:
            return payload.signalLevel;
        case signalKeys.signalLevelMin:
            return payload.signalLevelMin;
        default:
            return null;
    }
}

const CustomTooltip = (props) => {
    if (props.active && props.payload && props.payload.length === 1) {
        return (
            <div className={style.customTooltip}>
                <p className="label">{`Частота: ${props.payload[0].payload.frequency}`}</p>
                <p className="intro">{`Уровень сигнала, дБ: ${GetSignalLevel(props.currentSignalLevel, props.payload[0].payload)}`}</p>
            </div>
        );
    }
    return(
        <>
        </>
    )
}

export default CustomTooltip;
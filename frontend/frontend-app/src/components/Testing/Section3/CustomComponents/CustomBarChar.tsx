import React from "react";
import style from "../ViewResult.module.css";
import {Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import CustomTooltip from "./CustomTooltip";
import {DataSetTypeForViewResult, signalKeys} from "../../../../types/generalTypes";

type PropsType = {
    dataSet: Array<DataSetTypeForViewResult> | null,
    currentSignalLevel: signalKeys
}

const MyBarChar: React.FC<PropsType> = (props) => {
    return (
        <div className={style.viewer_diagram}>
            <BarChart
                width={1000}
                height={500}
                data={props.dataSet as any[]}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="frequency" tickMargin={10}/>
                <YAxis />
                <Tooltip content={<CustomTooltip currentSignalLevel={props.currentSignalLevel}/>}/>
                <Bar dataKey={props.currentSignalLevel} fill="#8ed78e" isAnimationActive={true}/>
            </BarChart>
        </div>
    )
}

export default MyBarChar;
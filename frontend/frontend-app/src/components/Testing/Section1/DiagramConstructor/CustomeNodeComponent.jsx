import myStyle from "./DiagramConstructor.module.css";
import {Handle} from "react-flow-renderer";
import React from "react";

const CustomNodeComponent = ({data}) => {
    return (
        <div className={myStyle.element_on_field} data-title={data.label} tabIndex={0}>
            <img src={data.img} style={{pointerEvents: 'none'}} alt={data.label}/>
            <p>{data.text}</p>
            <Handle
                type="source"
                position="left"
                style={{borderRadius: '10px', width: '12px', height: '12px', backgroundColor: 'rgb(0, 255, 127)'}}
                id="a"/>
            <Handle
                type="target"
                position="right"
                id="b"
                style={{borderRadius: '10px', width: '12px', height: '12px', backgroundColor: 'rgb(39, 205, 6)'}}
                isValidConnection = {data.isValidConnection}
            />
        </div>
    );
};

export default CustomNodeComponent;
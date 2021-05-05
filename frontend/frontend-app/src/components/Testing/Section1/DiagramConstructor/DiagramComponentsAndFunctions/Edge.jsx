import {getBezierPath} from "react-flow-renderer";
import myStyle from "../DiagramConstructor.module.css";
import React from "react";

const Edge = ({
                        id,
                        sourceX,
                        sourceY,
                        targetX,
                        targetY,
                        sourcePosition,
                        targetPosition,
                    }) => {
    const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

    return (
        <>
            <path id={id} className={`${myStyle.reactFlow__edge}`} d={edgePath}/>
        </>
    );
}

export default Edge;
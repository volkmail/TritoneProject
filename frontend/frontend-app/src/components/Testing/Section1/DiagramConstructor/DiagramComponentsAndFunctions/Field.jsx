import ReactFlow, {addEdge, Controls, isEdge, ReactFlowProvider, removeElements} from "react-flow-renderer";

import {
    AddElementOnField,
    DeleteElementFromField, RefreshElementsList, SetSAZOn,
} from "../../../../../redux/ActionCreators/DiagramActionCreators";

import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import myStyle from "../DiagramConstructor.module.css";
import NodeComponent from "./NodeComponent";
import Edge from "./Edge";
import ConnectionLine from "./ConnectionLine";
import {RemoveConnections} from "./HelpFunctions";

const Filed = (props) => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=> {
        props.setResultElements(elements);
    },[elements, props]);

    useEffect(()=>{
        if(props.needCleanField){
            setElements([]);
            dispatch(RefreshElementsList());
            props.setNeedClean(false);
        }
    },[props.needCleanField])

    const isValidConnection = (connection) => {
        for (let i = 0; i < props.connections.length; i++) {
            let handle = props.connections[i].split('-');
            if (handle[0].substring(0, 1) === connection.target || handle[0].substring(0, 1) === connection.source)
                return false;
            if (handle[1].substring(0, 1) === connection.target || handle[0].substring(0, 1) === connection.source)
                return false;
        }
        return true;
    }

    const onConnect = (params) => {
        let paramsCopy = {
            ...params,
            id: `${params.source}${params.sourceHandle}-${params.target}${params.targetHandle}`,
            type: 'custom'
        };

        props.setConnection(connections => [...connections, paramsCopy.id]);
        setElements((els) => addEdge(paramsCopy, els));
    };

    const onElementsRemove = (elementsToRemove) => {
        let connectionsToRemove = [];

        elementsToRemove.forEach(el => {
            isEdge(el) ? connectionsToRemove.push(el.id)
                : dispatch(DeleteElementFromField(parseInt(el.id)));
        })

        props.setConnection(RemoveConnections(props.connections, connectionsToRemove));
        setElements((els) => removeElements(elementsToRemove, els));
    }

    const onLoad = (_reactFlowInstance) =>
        setReactFlowInstance(_reactFlowInstance);

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event) => {
        event.preventDefault();
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const [id, image, name, text] = event.dataTransfer.getData('text/plain').split('|');
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
            id: id,
            type: 'special',
            position,
            data: {label: `${name}`, img: image, text: text, isValidConnection: isValidConnection},
        };

        if(id==="19")
            dispatch(SetSAZOn());

        setElements((es) => es.concat(newNode));
        props.setResultElements(elements);
        dispatch(AddElementOnField(parseInt(id)));
    };

    return (
        <div id="schema_field" className={`${myStyle.constructor_field} ${props.smallField && myStyle.small_constructor_field}`}>
            <ReactFlowProvider>
                <div style={props.smallField ? {height: '70vh', width: '33.3vw'} : {height: '70vh', width: '70vw'}} ref={reactFlowWrapper}>
                    <ReactFlow
                        elements={elements}
                        onConnect={onConnect}
                        onElementsRemove={onElementsRemove}
                        onLoad={onLoad}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        nodeTypes={{special: NodeComponent}}
                        edgeTypes={{custom: Edge}}
                        connectionLineComponent={ConnectionLine}
                    >
                        <Controls/>
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    )
}

export default Filed;


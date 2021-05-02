import React, {useState, useRef} from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    Controls
} from 'react-flow-renderer';

import myStyle from './DiagramConstructor.module.css';
import ElementsList from "./ElementsList/ElementsList";
import {useDispatch} from "react-redux";
import {PopElement} from "../../../../redux/ActionCreators/DiagramActionCreators";
import CustomEdge from "./CustomEdge";
import CustomConnectionLine from "./CustomConnectionLine";
import CustomNodeComponent from "./CustomeNodeComponent";

const idealConnectionsInit = {
    version1: ["5a-1b", "2a-5b", "6a-2b", "3a-6b", "4a-3b"],
    version2: ["1a-5b", "5a-2b", "2a-6b", "6a-3b", "3a-4b"]
}

const DiagramConstructor = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState([]);
    const [connections, setConnection] = useState([]);
    const [idealConnections, setIdealConnections] = useState(idealConnectionsInit);
    const [isSuccessComplete, setSuccess] = useState(false);
    const [checkedMessage, setCheckedMessage] = useState("");
    //TODO: добавить удаление соединения из массива, при удалении edge
    const dispatchPopElement = useDispatch();

    const isValidConnection = (connection) => {
        for (let i = 0; i < connections.length; i++) {
            let handle = connections[i].split('-');
            if (handle[0].substring(0, 1) === connection.target || handle[0].substring(0, 1) === connection.source)
                return false;
            if (handle[1].substring(0, 1) === connection.target || handle[0].substring(0, 1) === connection.source)
                return false;
        }
        return true;
    }

    const onConnect = (params) => {
        console.log(params);
        let paramsCopy = {
            ...params,
            id: `${params.source}${params.sourceHandle}-${params.target}${params.targetHandle}`,
            type: 'custom'
        };

        setConnection(connections => [...connections, paramsCopy.id]);

        setElements((els) => addEdge(paramsCopy, els));
    };

    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));

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
        setElements((es) => es.concat(newNode));
        dispatchPopElement(PopElement(parseInt(id)));
    };

    const onCheckHandler = () => {
        let isSuccess;
        let isSuccessV1Count = 0;
        let isSuccessV2Count = 0;

        if(connections && connections.length === idealConnections.version1.length){

            for (let i = 0; i<connections.length; i++){
                for(let j=0; j<idealConnections.version1.length; j++){
                    let con = connections[i];
                    let idealCon = idealConnections.version1[j];
                    if(con === idealCon){
                        isSuccessV1Count++;
                        break;
                    }
                }
            }

            if(isSuccessV1Count !== 5){
                for (let i = 0; i<connections.length; i++){
                    for(let j=0; j<idealConnections.version2.length; j++){
                        if(connections[i] === idealConnections.version2[j]){
                            isSuccessV2Count++;
                            break;
                        }
                    }
                }
            }

            isSuccessV1Count === 5 || isSuccessV2Count === 5 ? isSuccess = true : isSuccess = false;
        }
        else {
            isSuccess = false;
            setCheckedMessage("НЕ ВСЕ СОЕДИНЕНИЯ УСТАНОВЛЕНЫ");
        }

        isSuccess ? setSuccess(isSuccess) : setSuccess(isSuccess);
    }

    const onFinishHandler = () => {

    }

    return (
        <div className={myStyle.constructor_container}>
            <div className={isSuccessComplete? myStyle.successTitle : `${myStyle.successTitle} ${myStyle.successTitleHidden}`}>
                <h1 className="font_bold-center">ЗАДАНИЕ ВЫПОЛНЕНО УСПЕШНО!</h1>
            </div>
            <div className={myStyle.constructor}>
                <ElementsList/>
                <div className={myStyle.constructor_elements}>
                    <div id="schema_field" className={myStyle.constructor_field}>
                        <ReactFlowProvider>
                            <div style={{height: '70vh', width: '73vw'}} ref={reactFlowWrapper}>
                                <ReactFlow
                                    elements={elements}
                                    onConnect={onConnect}
                                    onElementsRemove={onElementsRemove}
                                    onLoad={onLoad}
                                    onDrop={onDrop}
                                    onDragOver={onDragOver}
                                    nodeTypes={{special: CustomNodeComponent}}
                                    edgeTypes={{custom: CustomEdge}}
                                    connectionLineComponent={CustomConnectionLine}
                                >
                                    <Controls/>
                                </ReactFlow>
                            </div>
                        </ReactFlowProvider>
                    </div>
                    <div className={myStyle.constructor_remote_elements}>
                        {
                            !isSuccessComplete ? <>
                              {/*<button id="delete_object" className="button_classic">Удалить элемент</button>*/}
                              <button id="schema_check" className="button_classic" onClick={onCheckHandler}>Проверить</button>
                            </>
                            : <button className="button_classic" onClick={onFinishHandler}>Завершить выполнение</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiagramConstructor;
import React, {useState, useRef} from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    Controls, Handle,
} from 'react-flow-renderer';

import style from './DiagramConstructor.module.css';
import ElementsList from "./ElementsList/ElementsList.jsx";

const DiagramConstructor = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState([]);

    const onConnect = (params) => {
        let paramsCopy = {
            ...params,
            type: 'default',
            animated: true,
            style: {stroke: 'black', strokeWidth: '1.75'},
            arrowHeadType: 'arrow'
        };
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
        const name = event.dataTransfer.getData('application/reactflow');
        const [id, image] = event.dataTransfer.getData('text/plain').split('|');
        debugger;
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
            id: id,
            type: 'special',
            position,
            data: {label: `${name}`, img: image},
        };
        setElements((es) => es.concat(newNode));
    };

    return (
        <div className={style.constructor_container}>
            <ElementsList />
            <div className={style.constructor_elements}>
                <div id="schema_field" className={style.constructor_field}>
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
                                connectionLineComponent={CustomConnectionLine}
                            >
                                <Controls/>
                            </ReactFlow>
                        </div>
                    </ReactFlowProvider>
                </div>
                <div className={style.constructor_remote_elements}>
                    <a id="history_back" className="button_classic" href="#">back</a>
                    <a id="history_forward" className="button_classic" href="#">forward</a>
                    <a id="delete_object" className="button_classic" href="#">Удалить элемент</a>
                    <a id="schema_check" className="button_classic" href="#">Проверить</a>
                    <a id="con" className="button_classic" href="#">Соединить</a>
                </div>
            </div>
        </div>
    );
}

const CustomNodeComponent = ({data}) => {
    return (
        <div className={style.element_on_field} data-title={data.label}>
            <img src={data.img} style={{pointerEvents: 'none'}}/>
            <Handle
                type="source"
                position="left"
                style={{borderRadius: '10px', width: '12px', height: '12px', backgroundColor: 'rgb(39, 205, 6)'}}
                id="a"/>
            <Handle
                type="source"
                position="right"
                id="b"
                style={{borderRadius: '10px', width: '12px', height: '12px', backgroundColor: 'rgb(39, 205, 6)'}}
            />
            <Handle
                type="target"
                position="top"
                id="c"
                style={{borderRadius: '10px', width: '12px', height: '12px', backgroundColor: 'rgb(39, 205, 6)'}}
            />
            <Handle
                type="target"
                position="bottom"
                id="d"
                style={{borderRadius: '10px', width: '12px', height: '12px', backgroundColor: 'rgb(39, 205, 6)'}}
            />
        </div>
    );
};

const CustomConnectionLine = ({sourceX, sourceY, targetX, targetY}) => {
    return (
        <g>
            <path
                fill="none"
                stroke="#222"
                strokeWidth={1.75}
                className="animated"
                d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`}
            />
            <circle cx={targetX} cy={targetY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5}/>
        </g>
    );
};

export default DiagramConstructor;
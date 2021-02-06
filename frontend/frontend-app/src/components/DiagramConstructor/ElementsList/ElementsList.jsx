import React, {useEffect} from 'react';
import style from './ElementsList.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getDiagramElements} from "../../../redux/reducers/diagramElements-reducer";

const ElementsList = () =>{

    const elements = useSelector(state => state.diagramPage.elements)
    const dispatchGetElements = useDispatch()

    useEffect(()=> {
        dispatchGetElements(getDiagramElements())
    },[dispatchGetElements])

    const onDragStart = (event) => {
        event.dataTransfer.setData('application/reactflow', event.currentTarget.dataset.title);
        event.dataTransfer.setData('text/plain', `${parseInt(event.currentTarget.id)}|${event.target.src}`);
        event.dataTransfer.effectAllowed = 'move';
    };
    return(
        <div className={style.elements_list_container}>
            <div className={style.elements_list_title}>
                <p className="font_usual-center">Содержимое комплекта</p>
            </div>
            <div id="elements" className={style.elements_list}>
                {elements && elements.length >= 1 && elements.map(el =>
                    <div id={el.element_id} className={style.element} data-title={el.element_name}
                         onDragStart={(event) => onDragStart(event)} draggable
                         key={el.elementId}>
                        <img src={el.element_image} alt={el.elementId}/>
                    </div>)}
            </div>
        </div>
    );
}

export default ElementsList;
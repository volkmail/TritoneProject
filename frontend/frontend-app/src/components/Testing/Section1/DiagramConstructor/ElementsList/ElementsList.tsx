import React, {useEffect, DragEvent} from 'react';
import style from './ElementsList.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getDiagramElements} from "../../../../../redux/reducers/diagramElements-reducer";
import {GetListElements} from "../../../../../redux/selectors/diagram-selector";

const ElementsList = () =>{

    const elements = useSelector(GetListElements)
    const dispatchGetElements = useDispatch()

    useEffect(()=> {
        dispatchGetElements(getDiagramElements())
    },[dispatchGetElements])

    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text/plain',
            `${event.currentTarget.id}
            |${(event.currentTarget.firstChild as HTMLImageElement).src}
            |${event.currentTarget.dataset.title}`)
        event.dataTransfer.effectAllowed = 'move';
    };

    return(
        <div className={style.elements_list_container}>
            <div className={style.elements_list_title}>
                <p className="font_usual-center">Содержимое комплекта</p>
            </div>
                <div id="elements" className={style.elements_list}>
                    {(elements && elements.length >= 1) ? elements.map(el =>
                        <div id={`${el.elementId}`} className={style.element} data-title={el.elementName}
                             onDragStart={(event) => onDragStart(event)} draggable
                             key={el.elementId}>
                            <img src={el.elementImageSrc} alt={`${el.elementId}`}/>
                        </div>):
                    <div>Loading...</div>}
                </div>
        </div>
    );
}

export default ElementsList;
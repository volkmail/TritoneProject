import React from 'react';
import style from './ElementsList.module.css';
import PC from '../../../assets/img/PC.svg';

const ElementsList = (props) =>{

    const onDragStart = (event) => {
        event.dataTransfer.setData('application/reactflow', event.currentTarget.dataset.title);
        event.dataTransfer.setData('text/plain', parseInt(event.currentTarget.id));
        event.dataTransfer.effectAllowed = 'move';
    };

    return(
        <div className={style.elements_list_container}>
            <div className={style.elements_list_title}>
                <p className="font_usual-center">Содержимое комплекта</p>
            </div>
            <div id="elements" className={style.elements_list}>
                {props.elementsOnList.length >= 1 && props.elementsOnList.map(el =>
                    <div id={el.elementId} className={style.element} data-title={el.dataTitle}
                         onDragStart={(event) => onDragStart(event)} draggable
                         key={el.elementId}>
                        <img src={PC} alt={el.elementId}/>
                    </div>)}
            </div>
        </div>
    );
}

export default ElementsList;
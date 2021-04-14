import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';
import style from './Section.module.css'

type PropsType = {
    sectionTitle: string,
    sectionBody: string,
    sectionRef: string
}

const Section:FC<PropsType> = (props: PropsType) => {
    return(
        <div className={style.container}>
            <div className={style.container_title}>
                <p className="font_usual-center">{props.sectionTitle}</p>
            </div>
            <div className={style.container_body}>
                <div className={style.container_body_text}>
                    <p className="font_usual-justify">
                        {props.sectionBody}
                    </p>
                </div>
                <NavLink to={props.sectionRef} className={style.button_start}>Приступить к выполнению</NavLink>
            </div>
        </div>
    )
}

export default Section;
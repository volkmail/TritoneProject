import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import style from './Section.module.css'
import {useDispatch} from "react-redux";
import {SetSectionComplete} from "../../redux/ThunkCreators/testingThunks";

type PropsType = {
    sectionTitle: string,
    sectionBody: string,
    sectionRef: string,
    unlockedSection: boolean
}

const Section: FC<PropsType> = (props: PropsType) => {
    const dispatch = useDispatch()
    const finishSection = () => {
        switch (props.sectionTitle[7]){
            case "1":
                dispatch((SetSectionComplete(1)));
                break;
            case "2":
                dispatch((SetSectionComplete(2)));
                break;
            case "3":
                dispatch((SetSectionComplete(3)));
                break;
        }
    }

    return (
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
                <button className={props.unlockedSection ? style.button_start : style.button_start_disabled}>
                    {
                        props.unlockedSection
                            ? <NavLink to={props.sectionRef}>Приступить к выполнению</NavLink>
                            : <>Приступить к выполнению</>
                    }
                </button>
                <button className={style.button_start} onClick={finishSection}>
                    Завершить раздел
                </button>
            </div>
        </div>
    )
}

export default Section;
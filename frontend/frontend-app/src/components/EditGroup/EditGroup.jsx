import React, {useEffect, useState} from "react";
import style from "./EditGroup.module.css";
import {useDispatch, useSelector} from "react-redux";
import {SelectGroups} from "../../redux/selectors/edit-selectors";
import 'react-list-editable/lib/react-list-editable.css';
import {GetGroups} from "../../redux/ThunkCreators/editThunks";
import MyEditableList from "./EditableList";

const EditGroup = () => {
    const groups = useSelector(SelectGroups);
    const [currentGroups, SetCurrentGroups] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetGroups());
    }, [])

    useEffect(() => {
        console.log(currentGroups);
    }, [currentGroups])

    useEffect(() => {
        if (groups) {
            const groupNames = groups.map(el => el.groupName);
            SetCurrentGroups([...groupNames]);
        }
    }, [groups])

    const finishButtonHandler = () => {

    }

    return (
        <div className={style.container}>
            <div className={style.table}>
                <p>Редактирование групп</p>
                {
                    currentGroups.length > 0
                        ?<div className={style.content}>
                            <MyEditableList groups={currentGroups} setCurrentGroups={SetCurrentGroups}/>

                        </div>

                        : <p>Загрузка групп...</p>
                }
                <button className="button_classic" onClick={finishButtonHandler}>Сохранить</button>
            </div>
        </div>
    )
}

export default EditGroup;
import React from "react";
import style from "./EditGroup.module.css";
import EditableList from "react-list-editable";
import 'react-list-editable/lib/react-list-editable.css';

const MyEditableList = (props) => {
    const onListChange = (newList) => {
        console.log(newList);
    }

    return (
        <EditableList
            list={props.groups}
            onListChange={(newList) => {props.setCurrentGroups([...newList])}}
            placeholder='Введите значение'
        />
    )
}

export default MyEditableList;
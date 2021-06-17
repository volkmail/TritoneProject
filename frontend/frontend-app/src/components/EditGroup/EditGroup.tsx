import React, {useEffect} from 'react';
import style from "./../EditTest/EditTest.module.css"
import {useDispatch, useSelector} from "react-redux";
import {GetGroups} from "../../redux/ThunkCreators/editThunks";
import {SelectGroups} from "../../redux/selectors/edit-selectors";
import GroupEditor from "./GroupEditor";

const EditTest = () => {
    const groups = useSelector(SelectGroups);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetGroups());
    }, [])

    return (
        <div className={style.container}>
            <p>Редактирование групп</p>
            <div className={style.contentGroups}>
                {groups
                    ? <>
                        {groups.map(el => <GroupEditor
                            groupId={el.groupId}
                            groupName={el.groupName}
                            isNew={false}
                        />)
                        }
                        <GroupEditor
                            groupId={(Math.max(...groups.map(el => el.groupId)) + 1)}
                            groupName={""}
                            isNew={true}
                        />
                    </>
                    : <p>Загрузка данных...</p>
                }
            </div>
        </div>
    );
};

export default EditTest;

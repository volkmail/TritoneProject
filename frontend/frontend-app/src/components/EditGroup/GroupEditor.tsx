import React, {useState} from "react";
import style from "./../EditTest/EditTest.module.css";
import {useDispatch} from "react-redux";
import {Form, Formik, FormikValues, useField} from "formik";
import {deleteGroup, editGroup} from "../../redux/ThunkCreators/editThunks";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
import CheckTwoToneIcon from "@material-ui/icons/CheckTwoTone";

type PropsType = {
    groupId: number,
    groupName: string,
    isNew: boolean
}

type QuestionFormikValuesType = {
    groupName: string,
}

type CustomTextInputPropsType = {
    name: string,
    type?: string,
    label: string,
    validate?: (value: any) => undefined | string | Promise<any>
}

const GroupEditor: React.FC<PropsType> = (props) => {
    const [isEdit, SetIsEdit] = useState(false);
    const dispatch = useDispatch();

    const initValues: QuestionFormikValuesType = {
        groupName: props.groupName,
    };

    const submit = async (values: FormikValues, actions: any) => {
        dispatch(editGroup(props.groupId, values.groupName));
        SetIsEdit(isEdit=>!isEdit);
    }

    const deleteClick = () => {
        dispatch(deleteGroup(props.groupId));
    }

    return (
        <Formik
            initialValues={initValues}
            onSubmit={submit}
        >
            {() => (
                <div className={style.question}>
                    <div className={style.question_title}>
                        <p>{props.groupName}</p>
                        <button className={style.editButton} onClick={() => SetIsEdit(isEdit => !isEdit)}>
                            <CreateTwoToneIcon style={{color: "#21a421"}} fontSize="small"/>
                        </button>
                        {!props.isNew
                        && <button className={style.deleteButton} onClick={deleteClick}>
                            <CancelTwoToneIcon style={{color: "#a42121"}} fontSize="small"/>
                        </button>
                        }

                    </div>
                    <Form className={`${style.editBlock} ${isEdit && style.expandedEditBlock}`}>
                        <TextInput name="groupName" type="text" label="Название группы"/>
                        <button type="submit">
                            <CheckTwoToneIcon style={{color: "#21a421"}} fontSize="small"/>
                        </button>
                    </Form>

                </div>
            )}
        </Formik>
    );
};

const TextInput = (props: CustomTextInputPropsType) => {
    const [field, meta] = useField(props);

    return (
        <div className={style.inputGroupGroups}>
            <input className={style.inputGroup__input} {...field} {...props}/>
            <label className={style.inputGroup__label} htmlFor={props.name}>{props.label}</label>
            <span
                className={meta.touched && meta.error ? style.inputGroup__errorVisible : style.inputGroup__errorHidden}
            >
                {meta.error}
            </span>
        </div>
    )
}

export default GroupEditor;
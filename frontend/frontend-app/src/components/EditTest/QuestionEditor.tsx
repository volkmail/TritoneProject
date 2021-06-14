import React, {useState} from 'react';
import style from "./EditTest.module.css"
import {QuizType} from "../../types/generalTypes";
import {Form, Formik, FormikValues, useField} from "formik";
import {NavLink} from "react-router-dom";
import {LogInUser} from "../../redux/ThunkCreators/userThunks";
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';

type PropsType = {
    questionId: string,
    questionText: string,
    answers: Array<{
        answerText: string,
        answerRight: boolean
    }>
    isNew: boolean
}

type QuestionFromikValuesType = {
    questionId: string,
    questionText: string,
    answer1: string,
    answer1Right: boolean,
    answer2: string,
    answer2Right: boolean
    answer3: string
    answer3Right: boolean
}

type CustomTextInputPropsType = {
    name: string,
    type: string,
    label: string,
    validate?: (value: any) => undefined | string | Promise<any>
}

const QuestionEditor: React.FC<PropsType> = (props) => {
    const [isEdit, SetIsEdit] = useState(false);

    const initValues: QuestionFromikValuesType = {
        questionId: props.questionId,
        questionText: props.questionText,
        answer1: props.answers[0].answerText,
        answer1Right:props.answers[0].answerRight,
        answer2: props.answers[1].answerText,
        answer2Right:props.answers[1].answerRight,
        answer3: props.answers[2].answerText,
        answer3Right:props.answers[2].answerRight,
    };

    const submit = async (values: FormikValues, actions: any) => {
        console.log(values);
        SetIsEdit(isEdit=>!isEdit);
    }

    // const editClick = () => {
    //
    // }

    return (
        <Formik
            initialValues={initValues}
            onSubmit={submit}
        >
            {() => (
                <div className={style.question}>
                    <div className={style.question_title}>
                        <p>{props.questionText}</p>
                        <button className={style.editButton} onClick={() => SetIsEdit(isEdit => !isEdit)}>
                            <CreateTwoToneIcon style={{color: "#21a421"}} fontSize="small"/>
                        </button>
                        {!props.isNew
                        && <button className={style.deleteButton}>
                            <CancelTwoToneIcon style={{color: "#a42121"}} fontSize="small"/>
                        </button>
                        }

                    </div>
                    <Form className={`${style.editBlock} ${isEdit && style.expandedEditBlock}`}>
                        <TextInput name="questionText" type="text" label="Текст вопроса"/>
                        <TextInput name="answer1" type="text" label="Текст ответа №1"/>
                        <TextInput name="answer2" type="text" label="Текст ответа №2"/>
                        <TextInput name="answer3" type="text" label="Текст ответа №3"/>
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
        <div className={style.inputGroup}>
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

export default QuestionEditor;

export type {
    QuestionFromikValuesType
}

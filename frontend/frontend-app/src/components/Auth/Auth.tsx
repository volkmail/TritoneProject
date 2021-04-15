import React from "react";
import {Form, Formik, useField} from 'formik'
import * as Yup from 'yup'
import style from "./Auth.module.css"
import {NavLink} from "react-router-dom";

type ValuesType = {
    login: string;
    password: string;
}

type CustomTextInputPropsType = {
    name: string,
    type: string,
    label: string
}

const Auth = () => {
    const initValues: ValuesType = {
        login: '',
        password: ''
    };

    const validateSchema = Yup.object({
        login: Yup.string().required('Обязательное поле'),
        password: Yup.string().required('Обязательное поле')
    });

    return (
        <Formik
            initialValues={initValues}
            validationSchema={validateSchema}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values));
                    resetForm();
                    setSubmitting(false);
                }, 3000)
            }}
        >
            {() => (
                <div className={style.formContainer}>
                    <hr/>
                    <Form className={style.form}>
                        <p className="font_usual-center">АВТОРИЗАЦИЯ</p>
                        <AuthTextInput name="login" type="text" label="Логин"/>
                        <AuthTextInput name="password" type="password" label="Пароль"/>
                        <button className="button_classic" type="submit">Войти</button>
                        <NavLink to={""}>Нет учетной записи?</NavLink>
                    </Form>
                </div>
            )}
        </Formik>
    )
}

const AuthTextInput = (props: CustomTextInputPropsType) => {
    const [field, meta] = useField(props);

    return (
        <div className={style.inputGroup}>
            <input className={style.inputGroup__input} {...field} {...props}/>
            <label className={style.inputGroup__label} htmlFor={props.name}>{props.label}</label>
            <span className={meta.touched && meta.error ? style.inputGroup__errorVisible : style.inputGroup__errorHidden}
            >
                {meta.error}
            </span>
        </div>
    )
}

export default Auth;
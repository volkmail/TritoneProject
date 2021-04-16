import React, {useState} from "react";
import {Form, Formik, FormikConfig, FormikValues, useField} from 'formik'
import * as Yup from 'yup'
import style from "./Auth.module.css"
import {NavLink, Redirect} from "react-router-dom";
import {LogInUser} from "../../redux/ThunkCreators/userThunks";
import {useDispatch, useSelector} from "react-redux";
import {GetAuthError, GetUserAccessToken} from "../../redux/selectors/user-selector";

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
    const authError = useSelector(GetAuthError);
    const token = useSelector(GetUserAccessToken)
    const dispatch = useDispatch();

    const initValues: ValuesType = {
        login: '',
        password: ''
    };

    const validateSchema = Yup.object({
        login: Yup.string().required('Обязательное поле'),
        password: Yup.string().required('Обязательное поле')
    });

    const submit = (values: FormikValues, actions: any) => {
        dispatch(LogInUser(values.login, values.password));
    }

    return (
        token
            ? <Redirect to={"/home"}/>
            :
        <Formik
            initialValues={initValues}
            validationSchema={validateSchema}
            onSubmit={submit}
        >
            {() => (
                <div className={style.formContainer}>
                    <hr/>
                    <Form className={style.form}>
                        <p className="font_usual-center">АВТОРИЗАЦИЯ</p>
                        <AuthTextInput name="login" type="text" label="Логин"/>
                        <AuthTextInput name="password" type="password" label="Пароль"/>
                        {authError && <p style={{color: "red"}}>{authError}</p>}
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
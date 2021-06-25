import React from "react";
import {Form, Formik, FormikValues, useField} from 'formik'
import * as Yup from 'yup'
import style from "./Auth.module.css"
import {NavLink, Redirect} from "react-router-dom";
import {LogInUser} from "../../redux/ThunkCreators/userThunks";
import {useDispatch, useSelector} from "react-redux";
import {GetAuthError, GetUserAccessToken, GetUserInfo, selectIsFetching} from "../../redux/selectors/user-selector";
import Fetch from "../Fetch/Fetch";

type PropsType = {
    setUserInfo: React.Dispatch<React.SetStateAction<any>>
}

type ValuesType = {
    login: string;
    password: string;
}

type CustomTextInputPropsType = {
    name: string,
    type: string,
    label: string,
    validate?: (value: any) => undefined | string | Promise<any>
}

const Auth = () => {
    const authError = useSelector(GetAuthError);
    const isFetching = useSelector(selectIsFetching);
    const dispatch = useDispatch();

    const initValues: ValuesType = {
        login: '',
        password: ''
    };

    const authValidateSchema = Yup.object({
        login: Yup.string().required('Обязательное поле'),
        password: Yup.string().required('Обязательное поле')
    });

    const submit = async (values: FormikValues, actions: any) => {
        let sha1 = require("sha1");
        const passwordHash:string = sha1(values.password, {asString: true}).substring(0,10);
        let a = 1;
        await dispatch(LogInUser(values.login, passwordHash));
        actions.setSubmitting(true);
    }

    return (
        isFetching
            ? <Fetch/>
            : <Formik
                initialValues={initValues}
                validationSchema={authValidateSchema}
                onSubmit={submit}
            >
                {() => (
                    <div className={style.formContainer}>
                        <Form className={style.form}>
                            <p className="font_usual-center">АВТОРИЗАЦИЯ</p>
                            <AuthTextInput name="login" type="text" label="Логин"/>
                            <AuthTextInput name="password" type="password" label="Пароль"/>
                            {authError && <p style={{
                                fontSize: "0.9rem",
                                backgroundColor: "#ff8f8f",
                                padding: "0.5vh",
                                borderRadius: "15px"
                            }}>{authError}</p>}
                            <button className="button_classic" type="submit">Войти</button>
                            <NavLink to={"/reg"}>Нет учетной записи?</NavLink>
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
            <span
                className={meta.touched && meta.error ? style.inputGroup__errorVisible : style.inputGroup__errorHidden}
            >
                {meta.error}
            </span>
        </div>
    )
}

export default Auth;
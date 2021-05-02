import React from "react";
import {Form, Formik, FormikValues, useField} from 'formik'
import * as Yup from 'yup'
import style from "./Auth.module.css"
import {NavLink, Redirect} from "react-router-dom";
import {LogInUser} from "../../redux/ThunkCreators/userThunks";
import {useDispatch, useSelector} from "react-redux";
import {GetAuthError, GetUserAccessToken, GetUserInfo} from "../../redux/selectors/user-selector";

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
    const dispatch = useDispatch();

    const initValues: ValuesType = {
        login: '',
        password: ''
    };

    const authValidateSchema = Yup.object({
        login: Yup.string().required('Обязательное поле'),
        password: Yup.string().required('Обязательное поле')
    });

    const submit = async (values: FormikValues, actions:any) => {
        let a = JSON.stringify({a: 1, b: "dasdasd", c: [1,2,3,4]});
        console.log(a);
        await dispatch(LogInUser(values.login, values.password));
        actions.setSubmitting(true);
    }

    return (
        <Formik
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
                        {authError && <p style={{color: "red"}}>{authError}</p>}
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
            <span className={meta.touched && meta.error ? style.inputGroup__errorVisible : style.inputGroup__errorHidden}
            >
                {meta.error}
            </span>
        </div>
    )
}

export default Auth;
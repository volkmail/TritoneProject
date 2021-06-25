import React, {useEffect} from "react"
import style from "./Registration.module.css"
import {Form, Formik, FormikValues, useField} from 'formik'
import {useDispatch, useSelector} from "react-redux";
import {GetGroups, GetUserInfo, isLoginBusy, isRegDone} from "../../redux/selectors/user-selector";
import {GetStudentsGroups, IsLoginBusy, RegistrStudent} from "../../redux/ThunkCreators/userThunks";
import { Redirect } from "react-router-dom";

type ValuesType = {
    login: string,
    password: string,
    repeatPassword: string,
    name: string,
    surname: string,
    patronymic: string,
    groupName: string
}

type CustomInputPropsType = {
    name: string,
    type: string,
    label: string,
    onBlur?: () => void
}

const Registration = () => {
    const groups = useSelector(GetGroups);
    const isBusyLogin = useSelector(isLoginBusy);
    const isReg = useSelector(isRegDone);
    const userInfo = useSelector(GetUserInfo);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(GetStudentsGroups());
    },[dispatch])

    const initValues: ValuesType = {
        login: '',
        password: '',
        repeatPassword: '',
        name: '',
        surname: '',
        patronymic: '',
        groupName: ''
    };

    const checkBusyLogin = (login: string) => new Promise((resolve) => {
        dispatch(IsLoginBusy(login));
        resolve(isBusyLogin);
    });

    const validSchema = (values: any) => {
        let isMistake: boolean = false;
        const errors = {
            login: '',
            password: '',
            repeatPassword: '',
            name: '',
            surname: '',
            patronymic: '',
            groupName: ''
        }

        if(!values.login){
            errors.login = "Обязательное поле";
        }

        else
            checkBusyLogin(values.login).then((value) => {
                if(value)
                    errors.login = "Данный логин уже используется";
            })

        if(!values.password){
            errors.password = "Обязательное поле";
        }
        else if (values.password.length < 8)
        {
            errors.password = "Пароль не может быть меньше 8 символов";
        }

        else if (values.password.length >= 20)
            errors.password = "Пароль не может быть больше 20 символов";

        if(!values.repeatPassword || values.repeatPassword !== values.password)
            errors.repeatPassword = "Пароли должны совпадать";

        if(!values.name)
            errors.name = "Обязательное поле";
        else if (values.name.length < 2)
            errors.name = "Имя должно содержать хотя бы два символа";
        else if (values.name.length >= 20)
            errors.name = "Имя не может содержать больше 20 символов";
        else if (/[0-9]/i.test(values.name))
            errors.name = "Имя не может содержать цифры";
        else if (/[a-z]/i.test(values.name))
            errors.name = "Имя не может содержать буквы латинского алфавита";

        if(!values.surname)
            errors.surname = "Обязательное поле";
        else if (values.surname.length < 2)
            errors.surname = "Фамилия должна содержать хотя бы два символа";
        else if (values.surname.length >= 20)
            errors.surname = "Фамилия не может содержать больше 20 символов";
        else if (/[0-9]/i.test(values.surname))
            errors.surname = "Фамилия не может содержать цифры";
        else if (/[a-z]/i.test(values.surname))
            errors.surname = "Фамилия не может содержать буквы латинского алфавита";

        if(!values.patronymic)
            errors.patronymic = "Обязательное поле";
        else if (values.patronymic.length < 2)
            errors.patronymic = "Отчетсво должно содержать хотя бы два символа";
        else if (values.patronymic.length >= 20)
            errors.patronymic = "Отчетсво не может содержать больше 20 символов";
        else if (/[0-9]/i.test(values.patronymic))
            errors.patronymic = "Отчетсво не может содержать цифры";
        else if (/[a-z]/i.test(values.patronymic))
            errors.patronymic = "Отчетсво не может содержать буквы латинского алфавита";

        if(values.groupName === "none")
            errors.groupName = "Обязательное поле";

        for(let key in errors){
            // @ts-ignore
            if(errors[key] !== "")
                isMistake = true;
        }

        if(isMistake)
            return errors;
        else
            return {};
    }

    const submit = (values: FormikValues, actions: any) => {
        let sha1 = require("sha1");
        const passwordHash:string = sha1(values.password, {asString: true}).substring(0,10);
        dispatch(RegistrStudent(values.login, passwordHash, values.name, values.surname, values.patronymic, values.groupName));
        actions.setSubmitting(true);
    }

    return (
        isReg
            ? !userInfo
                ? <Redirect to={"/statistic"}/>
                : <Redirect to={"/auth"}/>
            : <Formik
                initialValues={initValues}
                onSubmit={submit}
                validate={validSchema}
            >
                {({isSubmitting}) => (
                    <div className={style.formContainer}>
                        <Form className={style.form}>
                            <p>РЕГИСТРАЦИЯ СТУДЕНТА</p>
                            <div className={style.horizontalGroup}>
                                <div className={style.horizontalGroup_group}>
                                    <RegTextInput name="login" type="text" label="Логин"/>
                                    <RegTextInput name="password" type="text" label="Пароль"/>
                                    <RegTextInput name="repeatPassword" type="text" label="Подтверждение пароля"/>
                                </div>
                                <div className={style.horizontalGroup_group}>
                                    <RegTextInput name="surname" type="text" label="Фамилия"/>
                                    <RegTextInput name="name" type="text" label="Имя"/>
                                    <RegTextInput name="patronymic" type="text" label="Отчество"/>
                                    <RegSelect name="groupName" type="range" label="Группа">
                                        <option value={"none"}>---</option>
                                        {groups && groups.map(el => <option value={el.groupName}>{el.groupName}</option>)}
                                    </RegSelect>
                                </div>
                            </div>
                            <button className="button_classic" type="submit" disabled={isSubmitting}>Зарегистрироваться</button>
                        </Form>
                    </div>
                )}
            </Formik>
    )
}

const RegTextInput = (props: CustomInputPropsType) => {
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

const RegSelect = (props: any) => {
    const [field, meta] = useField(props);

    return(
        <div className={style.inputSelectionGroup}>
            <label htmlFor={props.name}>{props.label}</label>
            <select {...field} {...props}/>
            <span className={meta.touched && meta.error ? style.inputGroup__errorVisible : style.inputGroup__errorHidden}
            >
                {meta.error}
            </span>
        </div>
    )
}

export default Registration;
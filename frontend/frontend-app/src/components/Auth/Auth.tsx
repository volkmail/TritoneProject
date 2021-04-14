import React from "react";
import {Form, Formik, useField} from 'formik'
import * as Yup from 'yup'

type ValuesType = {
    login: string;
    password: string;
}

type CustomTextInputPropsType = {
    name: string,
    type: string,
    label: string
}

const CustomTextInput = (props: CustomTextInputPropsType) => {
    const [field, meta] = useField(props);
    //TODO: кастомизировать ошибку
    return (
        <>
            <label htmlFor={props.name}>{props.label}</label>
            <input {...field} {...props}/>
            {meta.touched && meta.error ? (
                <div>{meta.error}</div>
            ) : null}
        </>
    )
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
                <Form>
                    <h1>АВТОРИЗАЦИЯ</h1>
                    <CustomTextInput name="login" type="text" label="login"/>
                    <CustomTextInput name="password" type="password" label="password"/>
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    )
}

export default Auth
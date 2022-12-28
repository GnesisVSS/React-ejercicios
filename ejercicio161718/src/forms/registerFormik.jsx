import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Modelos
import { User } from '../models/user.class';
import { ROLES } from '../models/roles.enum';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
const RegisterFormik = () => {

    let user = new User();


    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirm: '',
        role: ROLES.USER
    }

    const RegisterSchema = Yup.object().shape(
        // Objeto a validar
        {
            username: Yup.string()
                .min(6, 'El nombre de usuario es muy corto')
                .max(12, 'El nombre de usuario es muy largo')
                .required('El nombre de usuario es obligatorio'),
            email: Yup.string()
                .email('Formato de email invalido')
                .required('El email es obligatorio'),
            role: Yup.string().oneOf([ROLES.USER, ROLES.ADMIN], 'Debes seleccionar un rol de: Usuario / Admin')
                .required('El rol es obligatorio'),
            password: Yup.string()
                .min(8, 'La contraseña es muy corta')
                .required('La contraseña es obligatoria')
                .matches(``),
            confirm: Yup.string()
                // cuando esté la contraseña
                .when("password", {
                    // Condiciones
                    // Si el valor existe y si es mayor a 0
                    is: value => (value && value.length > 0 ? true : false),
                    // Esto cuando ya se tiene un valor revisa que sea uno de la lista
                    then: Yup.string().oneOf(
                        // obtiene el valor de password
                        [Yup.ref("password")],
                        // mensaje de error
                        '¡La contraseña debe coincidir!'
                    )
                }).required('Debes confirmar la contraseña')
        }
    )

    const submit = (values) => {
        alert('Register User')
    }
    const history = useNavigate();
    const goBack = () => {
        history(-1);
    }
    return (
        <div>
            <h4>Register Formik</h4>
            <Formik
                initialValues={initialValues}
                validationSchema={RegisterSchema}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {({ values,
                    //para saber si el usuario ha tocado el campo
                    touched,
                    errors,
                    // Dice si se ha terminado de enviar
                    isSubmitting,
                    //Controlar cambios del campo
                    handleChange,
                    //controlar cambios de foco
                    handleBlur }) => (
                    <Form>
                        <label htmlFor="username">Username</label>
                        <Field id="username" type="text" name="username" placeholder="Tu nombre de usuario" />
                        {
                            //Si el usuario a tocado el email si no no sale
                            errors.username && touched.username &&
                            (
                                <ErrorMessage name="username" component='div'></ErrorMessage>

                            )
                        }
                        <label htmlFor="email">Email</label>
                        <Field id="email" type="email" name="email" placeholder="ejemplo@ejemplo.com" />
                        {
                            //Si el usuario a tocado el email si no no sale
                            errors.email && touched.email &&
                            (
                                <ErrorMessage name="email" component='div'></ErrorMessage>

                            )
                        }
                        <label htmlFor="password">Contraseña</label>
                        <Field
                            id="password"
                            name="password"
                            placeholder="password"
                            type="password"
                        />
                        {
                            errors.password && touched.password &&
                            (
                                <ErrorMessage name="password" component='div'></ErrorMessage>

                            )
                        }

                        <label htmlFor="confirm">Contraseña</label>
                        <Field
                            id="confirm"
                            name="confirm"
                            placeholder="confirm password"
                            type="password"
                        />
                        {
                            errors.confirm && touched.confirm &&
                            (
                                <ErrorMessage name="confirm" component='div'></ErrorMessage>

                            )
                        }

                        <button type="submit">Registrar nuevo usuario</button>
                        
                        {isSubmitting ? (<p>Ingresando tus credenciales...</p>) : null}
                        
                        <button onClick={goBack}>Ya tienes una cuenta? Ingresa aquí!</button>
                    </Form>

                )}</Formik>
        </div>
    );
}

export default RegisterFormik;

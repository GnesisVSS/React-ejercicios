import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography';

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Formato de email invalido')
        .required('El email es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
})

const LoginFormik = () => {
    const initialCredentials = {
        email: '',
        password: ''
    }

    

    const history = useNavigate();
    const reg = () => {
        history('/register');
    }
    return (
        <div>
            <h4>Login Formik</h4>
            <Formik
                // ***Valores iniciales que tomará el formulario
                initialValues={initialCredentials}
                // ***Yup validation schema***
                validationSchema={loginSchema}
                // ***Evento onSubmit
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    alert(JSON.stringify(values, null, 2));
                    // Al logearse esto se queda en el local storage del navegador
                    await localStorage.setItem('credentials', values)
                    history('/dashboard');
                }}
            >

                {/* Obtenemos props desde el formik */}

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
                        <label htmlFor="email">Email</label>
                        <Field id="email" type="email" name="email" placeholder="Tuemail@email.com" />
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

                        <button type="submit">Login</button>
                        {isSubmitting ? (<p>Ingresando tus credenciales...</p>) : null}
                        {/* <button>Registrarse</button> */}
                        <Typography variant='body2' color="blue" align='center'>
                            <Link color="inherit" href='' onClick={reg}>
                                No tienes una cuenta? registrate!
                            </Link>
                        </Typography>
                    </Form>

                )}



            </Formik>
        </div>
    );
}

export default LoginFormik;

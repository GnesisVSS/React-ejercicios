import React from 'react';
import PropTypes from 'prop-types';


import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid Email Format")
        .required("Email is Required"),
    password: Yup.string()
        .required('Password is required')
});


const LoginForm = ({ loged, fetching, onLogin }) => {

    const initialCredentials = {
        email: '',
        password: ''
    }

    return (
        <div>
            <Formik
                // *** Initial values that the form will take
                initialValues={initialCredentials}
                // *** Yup Validation Schema ***
                validationSchema={loginSchema}
                // ** onSubmit Event
                onSubmit={async (values) => {
                    onLogin(values.email, values.password)
                }}
            >
                {/* We obtain props from Formik */}

                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur }) => (
                    <Form>
                        <h1>Login</h1>
                        <div class="mb-3">
                            <label htmlFor="email" class="form-label">Email</label>

                            <Field id="email" class="form-control" type="email" name="email" placeholder="example@email.com" />

                            {/* Email Errors */}
                            {
                                errors.email && touched.email &&
                                (
                                    <ErrorMessage name="email" component='div'></ErrorMessage>
                                )
                            }
                        </div>
                        <div class="mb-3">
                            <label htmlFor="password" class="form-label">Password</label>
                            <Field
                                id="password"
                                name="password"
                                placeholder="password"
                                type='password'
                                class="form-control"
                            />
                            {/* Password Errors */}
                            {
                                errors.password && touched.password &&
                                (
                                    <ErrorMessage name="password" component='div'></ErrorMessage>
                                )
                            }
                        </div>




                        <button type="submit" class="btn btn-primary">Login</button>
                        {fetching ? (<p>LOADING...</p>) : null}
                        {isSubmitting ? (<p>Login your credentials...</p>) : null}
                    </Form>
                )}
            </Formik>
        </div>

    );
};

LoginForm.propTypes = {
    loged: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired
};



export default LoginForm;
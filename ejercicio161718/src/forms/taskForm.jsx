import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { LEVELS } from '../models/levels.enum';
import { Task } from '../models/task.class';


const TaskForm = ({ add, length }) => {

    const nameRef = useRef('')
    const descriptionRef = useRef('')
    const levelRef = useRef(LEVELS.NORMAL)

    function addTask() {
        const newTask = new Task(
            nameRef.current.value,
            descriptionRef.current.value,
            false,
            levelRef.current.value
        );

        add(newTask);
    }

    const initialValues = {
        name: '',
        description: '',
        completed: false,
        level: LEVELS.NORMAL
    }

    const RegisterSchema = Yup.object().shape(
        // Objeto a validar
        {
            name: Yup.string()
                .min(6, 'El nombre de la tarea es muy corto')
                .max(12, 'El nombre de la tarea es muy largo')
                .required('El nombre de la tarea es obligatorio'),
                description: Yup.string()
                .min(5, 'La descripción de la tarea es muy corta')
                .max(12, 'La descripción de la tarea es muy larga')
                .required('La descripción de la tarea es obligatorio'),
            completed: Yup.string()
                .required('El estado de la tarea es obligatorio')
        }
    )

    const normalStyle = {
        color: 'blue',
        fontWeight: 'bold'
    }

    const urgentStyle = {
        color: 'yellow',
        fontWeight: 'bold'
    }

    const blockingStyle = {
        color: 'red',
        fontWeight: 'bold'
    }

    return (
        <Formik initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={async (values,e) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    alert(JSON.stringify(values, null, 2));
                    addTask();
                    
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
                preventDefault,
                //controlar cambios de foco
                handleBlur }) => (
                <Form className='d-flex justify-content-center align-items-center mb-4'>
                    
                    <div className='form-outline flex-fill'>
                        {/* NOMBRE DE LA TAREA*/}
                        {/* <label htmlFor="name">Nombre de la tarea</label> */}
                        <Field innerRef={nameRef} name="name"  id="name" type="text" className='form-control form-control-lg' placeholder='Task Name' autoFocus />
                        {
                            //Si el usuario a tocado el email si no no sale
                            errors.name && touched.name &&
                            (
                                <ErrorMessage name="name" component='div'></ErrorMessage>
                            )
                        }

                        {/* DESCRIPCION DE LA TAREA */}
                        {/* <label htmlFor="description">Descripcion de la tarea</label> */}
                        <Field id="des" name="description" innerRef={descriptionRef} type="text" className='form-control form-control-lg' placeholder='Task Description' />
                        {
                            //Si el usuario a tocado el email si no no sale
                            errors.description && touched.description &&
                            (
                                <ErrorMessage name="description" component='div'></ErrorMessage>

                            )
                        }

                        <Field component="select" className='form-control form-control-lg' innerRef={levelRef}  id='level' name='level'>
                            <option value={LEVELS.NORMAL}>
                                Normal
                            </option>
                            <option value={LEVELS.URGENT}>
                                Urgent
                            </option>
                            <option value={LEVELS.BLOCKING}>
                                Blocking
                            </option>
                        </Field>
                        <button type='submit' className='btn btn-success btn-lg ms-2'>
                            {length > 0 ? 'Añade una tarea' : 'Crea tu primera tarea'}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>

        // <form onSubmit={addTask} className='d-flex justify-content-center align-items-center mb-4'>
        //     <div className='form-outline flex-fill'>
        //         <input ref={nameRef} id='inputName' type='text' className='form-control form-control-lg' required autoFocus placeholder='Task Name'></input>
        //         <input ref={descriptionRef} id='inputDescription' type='text' className='form-control form-control-lg' required placeholder='Task Description'></input>
        //         <select className='form-control form-control-lg' ref={levelRef} defaultValue={LEVELS.NORMAL} id='selectLevel'>
        //             <option value={LEVELS.NORMAL}>
        //                 Normal
        //             </option>
        //             <option value={LEVELS.URGENT}>
        //                 Urgent
        //             </option>
        //             <option value={LEVELS.BLOCKING}>
        //                 Blocking
        //             </option>
        //         </select>
        //         <button type='submit' className='btn btn-success btn-lg ms-2'>
        //             {length > 0 ? 'Añade una tarea' : 'Crea tu primera tarea'}
        //         </button>
        //     </div>

        // </form>
    );
}

TaskForm.propTypes = {
    add: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired
}

export default TaskForm;

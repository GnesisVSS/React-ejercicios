import React, { useRef } from 'react';
import { Contacto } from '../../models/contacto.class';

const ContactoForm = ({ crear }) => {

    const nombreRef = useRef('');
    const emailRef = useRef('');

    function CrearContacto(e) {
        e.preventDefault();
        const nuevoContacto = new Contacto(
            nombreRef.current.value,
            emailRef.current.value,
            false
        );

        crear(nuevoContacto);
    }

    return (
        <div className='py-4'>
            <form onSubmit={CrearContacto} className='d-flex justify-content-center align-items-center mb-4'>
                <div className='form-outline flex-fill'>
                    <input ref={nombreRef} id='inputNombre' type='text' className='form-control form-control-lg' required autoFocus placeholder='Nombre Contacto'></input>
                    <input ref={emailRef} id='inputEmail' type='text' className='form-control form-control-lg' required placeholder='Email'></input>
                    <button type='submit' className='btn btn-success btn-lg ms-2'>Add</button>
                </div>

            </form>
        </div>
    );
}

export default ContactoForm;

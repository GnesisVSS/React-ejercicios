import React from 'react';
import PropTypes from 'prop-types'
import { Contacto } from '../../models/contacto.class';

const Contactos = ({ cont, eliminar, estado }) => {

    function CompletadoButon() {
        if (cont.estado) {
            return(<i onClick={() => estado(cont)} className='bi-circle-fill' style={{ color: 'green', cursor:'pointer'}}>Conectado</i>)
        } else {
            return (<i onClick={() => estado(cont)} className='bi-circle-fill'  style={{ color: 'grey' , cursor:'pointer'}}>Desconectado</i>)
            
        }
    }

    return (
        <tr className='fw-normal'>
            <th>
                <span className='ms-2'>{cont.nombre}</span>
            </th>
            <td className='align-middle'>
                <span>{cont.email}</span>
            </td>
            <td className='align-middle'>
                {/* <span>{cont.estado ? 'Conectado':'Desconectado'}</span> */}
                {CompletadoButon()}
            </td>
        </tr>
    );
}

Contactos.propTypes = {
    // El padre entrega una tarea
    cont: PropTypes.instanceOf(Contacto).isRequired,
    eliminar: PropTypes.func.isRequired,
    estado: PropTypes.func.isRequired
}

export default Contactos;

import React, { useState } from 'react';
import { Contacto } from '../models/contacto.class';
import Contactos from './container/contactos';
import ContactoForm from './forms/Contacto-form';

const ContactosLista = () => {

    const contactoDef1 = new Contacto('Genesis', 'Gnesis.vss@gmail.com', false);
    const contactoDef2 = new Contacto('Pedro', 'Pedro@gmail.com', true);
    const contactoDef3 = new Contacto('Nicolas', 'Nicolas@gmail.com', false);
    const contactoDef4 = new Contacto('Felipe', 'Felipe@gmail.com', true);

    const [contacto, setContacto] = useState([contactoDef1, contactoDef2, contactoDef3, contactoDef4]);

    function CrearContacto(cont) {
        const index = contacto.indexOf(cont);
        const tempCont = [...contacto];
        tempCont.push(cont);
        setContacto(tempCont);
    }

    function EliminarContacto(cont) {
        const index = contacto.indexOf(cont);
        const tempCont = [...contacto];
        tempCont.splice(index, 1);
        setContacto(tempCont);
    }

    function Estado(cont) {
        const index = contacto.indexOf(cont);
        const tempCont = [...contacto];
        tempCont[index].estado = !tempCont[index].estado;
        setContacto(tempCont);
    }

    return (
        <div>
            <h1>Contactos:</h1>
            <table>
                <thead>
                    <tr>
                        <th scope='col'>Nombre</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {/* TODO: Iterar sobre una lista de tareas */}
                    {/* La key es una clave unica que se le da al dom, es la manera en la que se identifica un elemento en el dom */}
                    {/* esto se mejecuta por cuantas tareas haya en la lista */}

                    {/* Recorre la lista de tasks(variable creada en useState con valores por defecto) 
                            dandole otro nombre de variable para utilizar y un index*/}
                    {contacto.map((cont, index) => {

                        //retorna lo del hijo con su llave(index), task(que lo solicita como props) y se
                        //le da el valor de cada task que recorra el map
                        //y luego el complete que tambien lo pide como prop y se le da el 
                        //valor de la funcion con el true o false de la tarea
                        return (

                            <Contactos key={index} cont={cont}
                                eliminar={EliminarContacto} estado={Estado}></Contactos>
                        )
                    })}



                </tbody>
            </table>
            <ContactoForm crear={CrearContacto}></ContactoForm>
        </div>
    );
}

export default ContactosLista;

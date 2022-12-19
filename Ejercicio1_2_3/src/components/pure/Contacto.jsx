import ConectadoBool from "./Conectado";
import PropTypes from 'prop-types';

export class Contacto {
    nombre = '';
    apellido = '';
    email = '';
    conectado = false;

    constructor(nombre, apellido, email, conectado) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.conectado = conectado;
    }
}
const def = new Contacto('Genesis', 'Sáez', 'Gnesis.vss@gmail.com', true)
const ContDef = () => {
    return (
        <div>
            <h5>
            Nombre: {def.nombre}
            </h5>
            <h5>
            Apellido: {def.apellido}
            </h5>
            <h5>
            Email: {def.email}
            </h5>
            <h5>
            Estado: <ConectadoBool contacto={def.conectado}></ConectadoBool>
            </h5>
            
            
        </div>
    )
}

ContDef.propTypes = {
    // El padre entrega una tarea
    nombre: PropTypes.string,
    apellido: PropTypes.string,
    email : PropTypes.string,
    conectado : PropTypes.bool

}

export default ContDef



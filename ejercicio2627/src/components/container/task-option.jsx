import React, { useContext } from 'react';
import { LEVELS } from '../../models/levels.enum';
const myContext = React.createContext(null);

const TaskOption = () => {
    // se le da un estado inicial null
    const state = useContext(myContext);
    // console.log(state.param)
    return (
        // select con las opciones a retornar
        <select className='form-select' onChange={state.param}>
            <option disabled selected >Escoge una opcion</option>
            <option value={LEVELS.NORMAL} >Normal </option>
            <option value={LEVELS.URGENT}>Urgent</option>
            <option value={LEVELS.BLOCKING}>Blocking</option>
            <option value='todos'>Mostrar todos</option>
        </select>

    );

}

export default TaskOption;

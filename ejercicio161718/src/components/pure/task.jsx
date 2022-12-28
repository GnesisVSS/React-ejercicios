// Recibe la prop que es la clase de task
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// Modelo
import { Task } from '../../models/task.class'
import { LEVELS } from '../../models/levels.enum'
// import '../../styles/task.scss'
// Importamos la hoja de estilos task.scss

const TaskComponent = ({ task, remove, complete }) => {

    useEffect(() => {
        console.log('Created task')
        return () => {
            console.log(`Task: ${task.name} is going to unmount`);
        };
    }, [task]);

    /**
     * Funcion que retorna un badge dependiendo del nivel de la tarea
     */
    function taskLevelBadge() {
        switch (task.level) {
            case LEVELS.NORMAL:

                return (
                    <h6 className='mb-0'>
                        <span className='badge bg-primary'>
                            {task.level}
                        </span>
                    </h6>)
            case LEVELS.URGENT:

                return (
                    <h6 className='mb-0'>
                        <span className='badge bg-warning'>
                            {task.level}
                        </span>
                    </h6>)
            case LEVELS.BLOCKING:

                return (
                    <h6 className='mb-0'>
                        <span className='badge bg-danger'>
                            {task.level}
                        </span>
                    </h6>)
            default:
                break;
        }
    }
    /**
     *funcion que retorna un icono dependiendo de la tarea
     */
    function taskiconCompletedIcon() {
        if (task.completed) {
            return (<i onClick={() => complete(task)} className='bi-toggle-on task-action' style={{ color: 'green' }}></i>)
        } else {
            return (<i onClick={() => complete(task)} className='bi-toggle-off task-action' style={{ color: 'grey' }}></i>)
        }
    }

    const taskCompleted = {
        fontWeight: 'bold',
        color: 'gray',
        textDecoration: 'line-through'
    }

    const taskPending = {
        fontWeight: 'bold',
        color: 'tomato'
}

return (
    // Puede devolver un tr, no es necesario que siempre sea un div
    <tr className='fw-normal' style={task.completed ? taskCompleted : taskPending}>
        <th>
            <span className='ms-2'>{task.name}</span>
        </th>
        <td className='align-middle'>
            <span>{task.description}</span>
        </td>
        <td className='align-middle'>
            {/* Ejecución de funcion para retornar el elemento badge*/}
            {taskLevelBadge()}
        </td>
        <td className='align-middle'>
            {/* TODO: SUSTITUIR por Icons */}
            {/* Ejecucion de la funcion en base a su completud */}
            {taskiconCompletedIcon()}
            <i className='bi-trash task-action' style={{ color: 'tomato' }} onClick={() => remove(task)} ></i>
        </td>

    </tr>
)
}

TaskComponent.propTypes = {
    // El padre entrega una tarea
    task: PropTypes.instanceOf(Task).isRequired,
    complete: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
}

export default TaskComponent


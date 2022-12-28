// Esto contiene las tareas que se les pasa a los hijos
import React, { useEffect, useState } from 'react';
import { LEVELS } from '../../models/levels.enum';
import { Task } from '../../models/task.class';
import TaskComponent from '../pure/task';

// Importamos la hoja de estilos de task.scss

import TaskForm from '../../forms/taskForm';

const TaskListComponent = () => {
    // estado del componente
    const defaultTask1 = new Task('Example1', 'Default Description1', true, LEVELS.NORMAL);
    const defaultTask2 = new Task('Example2', 'Default Description2', false, LEVELS.URGENT);
    const defaultTask3 = new Task('Example3', 'Default Description3', false, LEVELS.BLOCKING);

    const [tasks, setTasks] = useState([defaultTask1, defaultTask2, defaultTask3])
    const [loading, setLoading] = useState([true])

    //Control del ciclo de vida del componente
    useEffect(() => {
        console.log('Task state has been modified')
        setTimeout(() => {
            setLoading(false);
        },2000);
        return () => {
            console.log('Task component is going to unmount')
        };
    }, [tasks]);

    // task se le entregan mas abajo con el map que recorre 
    // las tareas por defecto del usestate (tasks)
    function completeTask(task) {
        console.log('Complete this task:', task)
        // Toma el indice de las tareas de task
        const index = tasks.indexOf(task);
        // Trae todas las tareas que contiene task
        const tempTask = [...tasks];
        // de todas las tareas que trajo, busca el indice y el valor completed(que sale de la clase) 
        // y se le da el valor contrario con !
        tempTask[index].completed = !tempTask[index].completed;
        // Actualizamos el estado del componente y actualizaremos el
        // Iterador de la tarea para mostrar la tarea actualizada

        // el settasks viene del usestate de arriba para actualizar un valor
        // en este caso se le da el resultado de temptask, el contrario al completed que tenia por defecto
        setTasks(tempTask);
    }

    function deleteTask(task) {
        console.log('Delete this task:', task)
        const index = tasks.indexOf(task);
        const tempTask = [...tasks];

        // En el temptask que es lo que trae como copia la lista de task se elimina un item de la lista con el index indicado
        tempTask.splice(index, 1);
        setTasks(tempTask);
    }

    function addTask(task) {
        console.log('Add this task:', task)
        const tempTask = [...tasks];
        tempTask.push(task);
        setTasks(tempTask);
    }

    const Table = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th scope='col'>Title</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Priority</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* TODO: Iterar sobre una lista de tareas */}
                    {/* La key es una clave unica que se le da al dom, es la manera en la que se identifica un elemento en el dom */}
                    {/* esto se mejecuta por cuantas tareas haya en la lista */}

                    {/* Recorre la lista de tasks(variable creada en useState con valores por defecto) 
                            dandole otro nombre de variable para utilizar y un index*/}
                    {tasks.map((task, index) => {

                        //retorna lo del hijo con su llave(index), task(que lo solicita como props) y se
                        //le da el valor de cada task que recorra el map
                        //y luego el complete que tambien lo pide como prop y se le da el 
                        //valor de la funcion con el true o false de la tarea
                        return (

                            <TaskComponent key={index} task={task}
                                complete={completeTask} remove={deleteTask}></TaskComponent>
                        )
                    })}



                </tbody>
            </table>
        )
    }

    let taskTable;

    if (tasks.length > 0) {
        taskTable = <Table></Table>
    } else {
        taskTable = (
            <div>
                <h3>No hay tablas por mostrar</h3>
                <h4>Porfavor, crea una nueva</h4>
            </div>
        )

    }

    const loadingStyle={
        color: 'grey',
        fontSize: '30px',
        fontWeight: 'bold'
    }

    return (
        <div>
            <div className='col-12'>
                <div className='card'>
                    {/* Card header {title} */}
                    <div className='card-header p3'>
                        <h5>Your Tasks</h5>
                    </div>
                    {/* card body {content} */}
                    <div className='card-body' data-mbd-perfect-scrollbar='true' style={{ position: 'relative', height: '400px' }}>
                        {/* TODO: Añadir Loading Spinner */}
                        {loading ? <p style={loadingStyle}>Loading...</p> : taskTable}
                    </div>
                </div>


            </div>
            {/* TODO: Aplicar un for/map para renderizar una lista */}
            {/* Aca se muestra lo que se había definido en task.jsx */}
            {/* <TaskComponent task={defaultTask}></TaskComponent> */}
            <TaskForm add={addTask} length={tasks.length}></TaskForm>
        </div>
    );
};


TaskListComponent.propTypes = {

};


export default TaskListComponent;

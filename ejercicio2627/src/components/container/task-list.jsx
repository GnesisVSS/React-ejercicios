// Esto contiene las tareas que se les pasa a los hijos
import React, { useContext, useEffect, useReducer } from 'react';

// importando los modelos
import { LEVELS } from '../../models/levels.enum';
import { Task } from '../../models/task.class';

// importando el los componentes puros y forms
import TaskComponent from '../pure/task';
import TaskForm from '../../forms/taskForm';

// declarando las acciones
const COMPLETE = 'COMPLETE';
const DELETED = 'DELETED';
const ADDED = 'ADDED';
const STOPLOADING = 'LOADING';
const FILTER = 'FILTER';

// Declarando el context en null inicialmente
const myContext = React.createContext(null);

const TaskListComponent = () => {

    // Tareas iniciales para mostrar en la tabla en cuanto cargue el componente
    const defaultTask1 = new Task('Example1', 'Default Description1', true, LEVELS.NORMAL);
    const defaultTask2 = new Task('Example2', 'Default Description2', false, LEVELS.URGENT);
    const defaultTask3 = new Task('Example3', 'Default Description3', false, LEVELS.BLOCKING);

    // Estado inicial
    const initialState = {
        tareas: [defaultTask1, defaultTask2, defaultTask3],
        loading: true,
        isFiltered: false,
        param: ''
    }

    // declarando el reducer
    const reducer = (state, action) => {
        // se evaluan los tipos de acciones declarados anteriormente
        switch (action.type) {
            case COMPLETE:
                return {
                    // Se copia el estado con todo lo que contenga hasta el momento
                    ...state,
                    loading: false
                }
            case DELETED:
                return {
                    ...state,
                    loading: false
                }
            case ADDED:
                return {
                    ...state,
                    loading: false
                }
            case STOPLOADING:
                return {
                    ...state,
                    loading: false
                }
            case FILTER:
                return {
                    ...state,
                    isFiltered: true
                }
            default:
                return state;
        }
    }

    // se asigna el useReducer a un state y dispatch en base a un estado inicial
    const [state, dispatch] = useReducer(reducer, initialState);

    // de esta forma se acceden a las variables dentro del state
    const { tareas, loading, isFiltered} = state;
    
    const TaskOption = () => {
        // se le da un estado inicial null
        const state = useContext(myContext);
        
        // Se retornará a los hijos el select con las opciones correspondientes,
        // ejecutando el valor que se le de al state al cambiar la opcion escogida
        return (
            <select className='form-select' onChange={state}>
                <option disabled selected >Escoge una opcion</option>
                <option value={LEVELS.NORMAL} >Normal </option>
                <option value={LEVELS.URGENT}>Urgent</option>
                <option value={LEVELS.BLOCKING}>Blocking</option>
                <option value='todos'>Mostrar todos</option>
            </select>
        );
    }

    // Funcion que se ejecuta al completar una tarea
    function completeTask(task) {
        dispatch({ type: COMPLETE });

        console.log('Complete this task:', task)

        const index = tareas.indexOf(task);

        tareas[index].completed = !tareas[index].completed;
    }

    // Funcion que se ejecuta al eliminar una tarea
    function deleteTask(task) {
        dispatch({ type: DELETED })

        const index = tareas.indexOf(task);

        tareas.splice(index, 1)

        console.log('Delete this task:', task)

    }

    // Funcion que se ejecuta al añadir una tarea
    function addTask(task) {
        dispatch({ type: ADDED })

        console.log('Add this task:', task)

        tareas.push(task);
    }

    // Funcion que se ejecuta al cambiar el valor del select 
    const handleSelectChange = (event) => {
        const entrada = event.target.value

        dispatch({ type: FILTER })

        console.log(entrada);

        state.param = entrada;
    }

    //Definicion del contenido de la tabla 
    const Table = () => {
        return (
            // Se le provee al contexto el valor que se utilizaría para ejecutar al momento de cambiar la opcion elegida
            // en este caso ese valor es la funcion handleSelectChange
            <myContext.Provider value={handleSelectChange}>
                <div>
                    {/* se muestra en pantalla el contenido del padre taskOption */}
                    <TaskOption></TaskOption>
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
                        {/* se evalua si el campo está siendo filtrado(se obtiene este estado en las acciones
                        al hacer el dispatch el valor de isFiltered cambia) y se evalua tambien que el contenido del parametro
                        sea diferente a 'todos'*/}
                            {isFiltered && state.param !== 'todos' ? tareas.filter(elemento => elemento.level === state.param).map((task, index) => {
                                //Se filtra a partir de el nivel de la tarea
                                return (
                                    <TaskComponent key={index} task={task}
                                        complete={completeTask} remove={deleteTask} filter={handleSelectChange}></TaskComponent>)
                            }) : tareas.map((task, index) => {
                                return (
                                    <TaskComponent key={index} task={task}
                                        complete={completeTask} remove={deleteTask} filter={handleSelectChange}></TaskComponent> )
                            })}
                        </tbody>
                    </table>
                </div>
            </myContext.Provider>
        )
    }
    
    let taskTable;
    
    // Se evalua si el largo del arreglo de tareas es mayor a 0, es decir que no esté vacío
    if (tareas.length > 0) {
        // En caso de tener valores imprime la tabla
        taskTable = <Table></Table>
    } else {
        // en caso de ser un arreglo vacío...
        taskTable = (
            <div>
                <h3>No hay tablas por mostrar</h3>
                <h4>Porfavor, crea una nueva</h4>
            </div>
        )

    }

    // Se define el estilo del texto al cargar 
    const loadingStyle = {
        color: 'grey',
        fontSize: '30px',
        fontWeight: 'bold'
    }
    // se define un tiempo de espera para ejecutar el STOPLOADING
    // esto detiene la carga luego de dos segundos
    setTimeout(() => {
        dispatch({ type: STOPLOADING })
    },2000);

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
                        {/* en caso de que esté cargando se muestra el texto */}
                        {/* en caso de que no, muestra la tabla con los datos */}
                        {loading ? <p style={loadingStyle}>Loading...</p> : taskTable}
                    </div>
                </div>
            </div>
            {/* trae desde el padre TaskForm el formulario para añadir tareas*/}
            <TaskForm add={addTask} length={tareas.length}></TaskForm>
        </div>
    );
};


TaskListComponent.propTypes = {

};


export default TaskListComponent;

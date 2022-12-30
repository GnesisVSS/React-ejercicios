import React from 'react';
import { useState } from 'react';
import { getRandomJoke } from '../services/AxiosService';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const ChuckNorris = () => {


    // Declaracion UseState
    // Chiste random
    const [joke, setJoke] = useState(null);
    // Contador boton me gusta
    const [meGusta, setMeGusta] = useState(0);
    // Contador boton no me gusta
    const [noMeGusta, setNoMeGusta] = useState(0);
    // Nuevo chiste random
    const [nuevoChiste, setNuevoChiste] = useState(false);
    // Booleano de boton me gusta para bloquearlo en caso de false y desbloquearlo true
    const [botonLike, setBotonLike] = useState(true);
    // Booleano de boton no me gusta para bloquearlo en caso de false y desbloquearlo true
    const [botonDislike, setBotonDislike] = useState(true);
    // Contador general de me gustas
    const [contMgGeneral, setContMgGeneral] = useState(0);
    // Contador general de no me gustas
    const [contNoMgGeneral, setContNoMgGeneral] = useState(0);


    // funcion para volver los botones al estado anterior
    const resetBotones = () => {
        setBotonLike(true)
        setBotonDislike(true)
        setMeGusta(0)
        setNoMeGusta(0)
    }

    // Funcion para obtener un chiste nuevo
    const obtainJoke = () => {
        getRandomJoke()
            .then((response) => {
                if (response.status === 200) {
                    setJoke(response.data)
                    setNuevoChiste(true)
                    resetBotones()
                }
            })
            .catch((error) => {
                alert(`Something went wrong: ${error}`)
            })
    }

    // Funcion para definir el comportamiento al presionar el botón "me gusta"
    const Like = () => {
        setMeGusta(meGusta + 1);
        setContMgGeneral(contMgGeneral + 1)
        if (noMeGusta !== 0) {
            (setNoMeGusta(noMeGusta - 1));
            (setContNoMgGeneral(contNoMgGeneral - 1));
        }
        console.log({ meGusta })
        setBotonLike(false);
        setBotonDislike(true);
    }

    // Funcion para definir el comportamiento al presionar el botón "no me gusta"
    const Dislike = () => {
        setNoMeGusta(noMeGusta + 1);
        setContNoMgGeneral(contNoMgGeneral + 1)
        if (meGusta !== 0) {
            (setMeGusta(meGusta - 1));
            (setContMgGeneral(contMgGeneral - 1));
        }
        console.log({ noMeGusta })
        setBotonLike(true);
        setBotonDislike(false);

    }

    // Funcion para definir el estado (habilitado o deshabilitado) del botón "me gusta"
    const EstiloMg = () => {
        return (
            <div>
                {nuevoChiste && botonLike ?
                    (<Button variant="contained" startIcon={<ThumbUpIcon />} onClick={Like} color="success">
                        {meGusta}
                    </Button>)
                    :
                    (<Button disabled variant="contained" startIcon={<ThumbUpIcon />} onClick={Like} color="success">
                        {meGusta}
                    </Button>)}
            </div>)
    }

    // Funcion para definir el estado (habilitado o deshabilitado) del botón "no me gusta"
    const EstiloNoMg = () => {
        return (
            <div>
                {nuevoChiste && botonDislike ?
                    (<Button variant="outlined" startIcon={<ThumbDownAltIcon />} onClick={Dislike} color="error">
                        {noMeGusta}
                    </Button>)
                    :
                    (<Button disabled variant="outlined" startIcon={<ThumbDownAltIcon />} onClick={Dislike} color="error">
                        {noMeGusta}
                    </Button>)}
            </div>
        )
    }

    return (
        <div>
            {joke != null ?
                (
                    <div>
                        <h2>{joke.value}</h2>
                        <Button color="secondary" onClick={obtainJoke}>Generar chiste nuevo!</Button>
                        <div>
                            {EstiloMg()} {EstiloNoMg()}
                        </div>
                        <h1>
                            Chistes que te han gustado: {contMgGeneral}
                        </h1>
                        <h1>
                            Chistes que no te han gustado: {contNoMgGeneral}
                        </h1>
                    </div>

                )
                :
                (
                    <div>
                        <button onClick={obtainJoke} id='btnLike'>
                            Genera tu primer chiste!
                        </button>
                    </div>
                )
            }


        </div>

    );
}

export default ChuckNorris;

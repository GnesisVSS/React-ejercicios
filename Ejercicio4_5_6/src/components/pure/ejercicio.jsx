
import React, {useEffect, useState } from 'react'


const Clock = () => {

    const def = {
        fecha: new Date(),
        edad: 0,
        nombre: 'Martín',
        apellidos: 'San José'
    }
    const [inicial, setInicial] = useState(def)

    useEffect(() => {
        const timerID = setInterval(
            () => tick(), 1000
        );

        return () => {
            clearInterval(timerID);
        };
    });

    const tick = () =>  {
        return setInicial({
            ...inicial,
            fecha: new Date(),
            edad: (inicial.edad + 1)
        }) 
    }
    return (
        <div>
            <h2>
                Hora Actual:
                {inicial.fecha.toLocaleTimeString()}
            </h2>
            <h3>{inicial.nombre} {inicial.apellidos}</h3>
            <h1>Edad: {inicial.edad}</h1>
        </div>
    );


}

export default Clock;

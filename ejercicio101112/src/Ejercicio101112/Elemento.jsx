import React, { useState } from 'react';

const Elemento = () => {

    const [color, setColor] = useState('black');
        const [intv, setIntv] = useState(0);

    const cambioColor = () => {
        let red = Math.round(Math.random() * 255);
        let green = Math.round(Math.random() * 255);
        let blue = Math.round(Math.random() * 255);

        return setColor(`rgb(${red},${green},${blue})`);
    }

    const mouseEntra = () => {
        return setIntv(setInterval(cambioColor,500));
    };


    // function mouseEntraTiempo () {
    //     setInterval(() => {
    //         mouseEntra()
    //     }, 5);
    // }


    const mouseSale = () => {
        return (
            clearInterval(intv)
        )
            
    }

    

    const dimensionesAltura = {
        height: '255px',
        width: '255px',
        backgroundColor: color
    };

    return (
        <div style={dimensionesAltura} onMouseOver={mouseEntra} onMouseLeave={mouseSale} onDoubleClick={mouseSale}>

        </div>
    );
}

export default Elemento;

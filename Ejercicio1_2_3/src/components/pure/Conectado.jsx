// Recibe la prop que es la clase de task
import React from 'react'
import PropTypes from 'prop-types'

const ConectadoBool = ({ contacto }) => {
    return (
        <div>
            {contacto ? 'Contacto En Línea' : 'Contacto No Disponible'}

        </div>
    )
}

ConectadoBool.propTypes = {
    // El padre entrega una tarea
    contacto: PropTypes.bool
}

export default ConectadoBool




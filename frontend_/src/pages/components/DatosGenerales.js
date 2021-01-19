import React,{useState} from 'react'
import HeaderForm from './HeaderForm'
import Form from './FormDatosGenerales'

const DatosGenerales = () => {

    const [display, cambiarDisplay] = useState(true)
    return (
        <div className="container-formulario">
            <HeaderForm
                title = 'DATOS GENERALES'  
                cambiarDisplay={cambiarDisplay}      
            />
            <Form
                display={display}
            />
        </div>
    )
}

export default DatosGenerales

import React,{useState} from 'react'
import HeaderForm from './HeaderForm'
import Form from './FormResultados'

const Resultados = () => {
    
    const [display, cambiarDisplay] = useState(true)

    return (
        <div className="container-formulario">
            <HeaderForm
                title = 'RESULTADOS'  
                cambiarDisplay={cambiarDisplay}          
            />
            <Form
                display={display}
            />
        </div>
    )
}

export default Resultados

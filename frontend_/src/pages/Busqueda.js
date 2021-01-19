import React, {useContext} from 'react'
import Buscar from './components/Buscar'
import TablaDeRegistros from './components/TablaDeRegistros'

import { MuestrasContext } from '../context/MuestrasContext'
import './components/captura.css'
const Busqueda = () => {

    const { busqueda } = useContext(MuestrasContext)
    const opciones = [
        {key:1, value:'Nombre', label:'Nombre de la paciente'},
        {key:2, value:'Apellido', label:'Apellido de la paciente'},
        {key:3, value:'Medico', label:'Médico remitente'},
        {key:4, value:'Ingreso', label:'Fecha de ingreso'},
        {key:5, value:'Reporte', label:'Fecha de reporte'},
        {key:6, value:'Lugar', label:'Lugar de procedencia de la muestra'},
        {key:7, value:'Resultado', label:'Resultado positivo por marcador'}
    ]

    return (
        <div className="container-fluid">
            <Buscar
                opciones={opciones}
                metodo={'grupal'}
            />
            { busqueda ? 
            (
                <React.Fragment>
                    <TablaDeRegistros/>
                </React.Fragment>
            ) : null}
        </div>
    )
}

export default Busqueda

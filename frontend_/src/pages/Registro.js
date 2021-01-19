import React, {useContext, useEffect} from 'react'
import { useParams } from "react-router";

import Buscar from './components/Buscar'
import DatosGenerales from './components/DatosGenerales'
import Resultado from './components/Resultados'

import { MuestrasContext } from '../context/MuestrasContext'
import './components/captura.css'
const Registro = () => {

    const { busqueda, getMuestra } = useContext(MuestrasContext)
    const opciones = [
        {key:1, value:'Folio', label:'Folio de registro'},
        {key:3, value:'Codigo', label:'Codigo de barras'}
    ]
    let { id } = useParams();

    useEffect(()=> {
        const ConsultarRegistro = () => {
            getMuestra(id)
        }
        ConsultarRegistro()
    },[id])

    return (
        <div className="container-fluid">
            <Buscar
                opciones={opciones}
                metodo={'simple'}
            />
            { busqueda ? 
            (
                <React.Fragment>
                    <DatosGenerales/>
                    <Resultado/>
                </React.Fragment>
            ) : null}
        </div>
    )
}

export default Registro

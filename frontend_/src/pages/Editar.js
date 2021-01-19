import React, {useContext} from 'react'
import Buscar from './components/Buscar'
import DatosGenerales from './components/DatosGenerales'
import Resultado from './components/Resultados'

import { MuestrasContext } from '../context/MuestrasContext'
import './components/captura.css'
const Editar = () => {

    const { busqueda } = useContext(MuestrasContext)
    const opciones = [
        {key:1, value:'Folio', label:'Folio de registro'},
        {key:3, value:'Codigo', label:'Codigo de barras'}
    ]

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

export default Editar

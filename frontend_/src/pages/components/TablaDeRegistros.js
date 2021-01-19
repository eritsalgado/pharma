import React, {useContext} from 'react'
import {Link} from 'react-router-dom'

import { MuestrasContext } from '../../context/MuestrasContext'

const TablaDeRegistros = () => {
    const { registros_muestras } = useContext(MuestrasContext)


    return (
        <div className="row">
            <div className="col-12">
                <table className="table table-hover tabla-registros">
                    <thead>
                        <tr>
                            <th>Folio</th>
                            <th>Nombre de la madre</th>
                            <th>Fecha de la muestra</th>
                            <th>Tipo de estudio</th>
                            <th>Ultima revisión</th>
                            <th>Nombre de médico</th>
                            <th>Buscar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registros_muestras.map(registro => (
                            <tr key={registro.id}>
                                <td>{registro.folio}</td>
                                <td>{registro.nombre}</td>
                                <td>{registro.fecha_muestra}</td>
                                <td>{registro.tipo_estudio}</td>
                                <td>{registro.fecha_ult_rev}</td>
                                <td>{registro.nombre_medico}</td>
                                <td>
                                    <Link 
                                        to={`/portal/registro/${registro.id}`}
                                        className="btn btn-sm btn-block btn-info"
                                    >
                                        <i className="fas fa-search"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TablaDeRegistros

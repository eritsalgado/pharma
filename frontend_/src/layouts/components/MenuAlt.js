import React, { useState,useContext,useEffect } from 'react'
import {Link,useLocation} from 'react-router-dom'

import { MuestrasContext } from '../../context/MuestrasContext'


const MenuAlt = () => {
    let location = useLocation();
    const [activo, modificarActivo] = useState('dashboard')

    //La primera vez que cargue el sistema, obtener TODAS las muestras
    const { modificarAccion,limpiarData } = useContext(MuestrasContext)
    useEffect(()=> {
        switch (location.pathname) {
            case '/portal/captura':
                modificarActivo('captura')
                modificarAccion('captura')
                limpiarData()
                break;
            case '/portal/editar':
                modificarActivo('editar')
                modificarAccion('editar')
                break;
            case '/portal/busqueda':
                modificarActivo('busqueda')
                modificarAccion('busqueda')
                break;
        
            default:
                modificarActivo('dashboard')
                modificarAccion('dashboard')
                break;
        }
    },[location])

    return (
        <div className='sidebar'>
            <Link 
                to='/portal/captura' 
                className={activo === 'captura' 
                            ? 'pagina_activa'
                            :null}
            >
                <i className="far fa-clipboard"></i>
                <span>
                    Captura de Datos
                </span>
            </Link>
            <Link 
                to='/portal/editar' 
                className={activo === 'editar' 
                            ? 'pagina_activa'
                            :null}
            >
                <i className="far fa-edit"></i>
                <span>
                    Editar Captura
                </span>
            </Link>
            <Link 
                to='/portal/busqueda' 
                className={activo === 'busqueda' 
                            ? 'pagina_activa'
                            :null}
            >
                <i className="fas fa-search"></i>
                <span>
                    Busquedas
                </span>
            </Link>
        </div>
    )
}

export default MenuAlt
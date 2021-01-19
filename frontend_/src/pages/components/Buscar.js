import React, { useState,useContext } from 'react'
import { MuestrasContext } from '../../context/MuestrasContext'
import swal from 'sweetalert'

const Buscar = ({opciones, metodo}) => {
    
    const { buscarNuevaMuestra, busquedaEspecifica, busquedaGrupal } = useContext(MuestrasContext)
    const [busqueda, Buscar] = useState('')
    const [categoria, cambiarCategoria] = useState(opciones[0].value)
    
    const obtenerInfo = e => {
        Buscar(e.target.value)
    }
    const actualizarCategoria = e => {
        cambiarCategoria(e)
    }
    const BuscarSiguiente = e => {
        e.preventDefault()

        if(categoria === '' || busqueda === ''){
            swal({
                title: "Error",
                text: "Debes llenar el campo de busqueda para seguir.",
                icon: "error"})
            return
        }
        const json = {
            categoria:categoria,
            busqueda:busqueda
        }

        metodo === 'simple' ? busquedaEspecifica(json) : busquedaGrupal(json)
        buscarNuevaMuestra(true)     
    }

    const {folio} = busqueda;

    return (
        <form onSubmit={BuscarSiguiente}>
            <div className="row justify-content-center">
                <div className="col-6 my-4">
                    <div className="input-group mb-3" style={{zIndex:'1'}}>
                        <div className="input-group-prepend">
                            <button 
                                className="btn btn-outline-secondary" 
                                type="submit"
                            >Buscar {categoria}</button>


                            <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <div className="dropdown-menu">
                                {opciones.map(opcion=> (
                                    <button 
                                        type="button" 
                                        className="dropdown-item" 
                                        key={opcion.key}
                                        onClick={e=>actualizarCategoria(opcion.value)}
                                    >
                                        {opcion.label}
                                    </button>
                                ))}
                                {/* <button type="button" className="dropdown-item" onClick={e=>actualizarCategoria('Folio')}>Folio de registro</button>
                                <button type="button" className="dropdown-item" onClick={e=>actualizarCategoria('Nombre')}>Nombre de paciente</button>
                                <button type="button" className="dropdown-item" onClick={e=>actualizarCategoria('Codigo')}>Codigo de barras</button> */}
                            </div>

                        </div>
                        <input 
                            type="text" 
                            name='folio'
                            value={folio}
                            onChange={obtenerInfo}
                            className="form-control" 
                            placeholder="Ej: MHS1234567"
                        />
                    </div>
                </div>    
            </div>
        </form>
    )
}

export default Buscar

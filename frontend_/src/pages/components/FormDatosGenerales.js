import React,{useState, useContext} from 'react'
import Calendario from '../../assets/img/Icono-Calendario.png'

import swal from 'sweetalert'

import { MuestrasContext } from '../../context/MuestrasContext'


const FormDatosGenerales = ({display}) => {

    const { datos_generales,modificarDatosGenerales,postMuestra,putMuestra,accion } = useContext(MuestrasContext)

    const [error, cambiarError] = useState(false)

    const obtenerInfo = e => {
        modificarDatosGenerales({
            ...datos_generales,
            [e.target.name] : e.target.value
        })
    }
    const [cargando, Cargar] = useState(false)
    const [cargado, CargadoSatisfactoriamente] = useState(false)

    const crearDatosGeneralesParaMuestra = e => {
        e.preventDefault()
        Cargar(true)
        // Revisar que no falte ningun dato
        if(
            codigo.trim() === '' || folio.trim() === '' || genero.trim() === '' ||
            fecha_nac.trim() === '' || nombre.trim() === '' ||
            vida_sexual.trim() === '' || tipo_de_muestra.trim() === '' || 
            tipo_estudio.trim() === '' || fecha_ult_rev.trim() === '' || resp_pro_adn.trim() === ''
        ){
            cambiarError(true)
            Cargar(false)
            swal({
                title: "Espera!",
                text: "Falta uno o más datos en el formulario!",
                icon: "error",
                button: "Ok",
              })
            return            
        }
        cambiarError(false)

        let tipo_de_estudio = datos_generales.tipo_estudio === "1" ? 'PRIMERA VEZ' : 'SEGUIMIENTO'
        
        let muestra = {
            codigo:datos_generales.codigo,
            folio:datos_generales.folio,
            genero:'FEMENINO',
            fecha_nac:datos_generales.fecha_nac,
            nombre:datos_generales.nombre,
            edad:datos_generales.edad,
            vida_sexual:datos_generales.vida_sexual,
            muestra:'CERVICO VAGINAL',
            tipo_de_muestra:datos_generales.tipo_de_muestra,
            tipo_estudio:tipo_de_estudio,
            fecha_ult_rev:datos_generales.fecha_ult_rev,
            resp_pro_adn:datos_generales.resp_pro_adn
        } 
        Cargar(false)   
        
        swal({
            title: "Seguro?",
            text: "¿Todos los datos correctos?",
            icon: "info",
            buttons: {
                cancelar: {
                    text:'Verificar',
                    value:'Verificar'
                },
                aceptar: {
                    text:'Crear',
                    value:'Crear'
                }
            } 
          }).then(
              (value)=>{
                switch (value) {
                    case 'Crear':
                        postMuestra(muestra) ? CargadoSatisfactoriamente(true) : CargadoSatisfactoriamente(false)
                        swal({
                            title: "Correcto",
                            text:'Registro de datos generales creado correctamente',
                            icon:'success'
                        })
                        break;
                
                    default:
                        break;
                }
              }
          )
        
    }
    const modificarDatosGeneralesParaMuestra = e => {
        e.preventDefault()
        Cargar(true)
        // Revisar que no falte ningun dato
        if(
            codigo.trim() === '' || folio.trim() === '' || genero.trim() === '' ||
            fecha_nac.trim() === '' || nombre.trim() === '' ||
            vida_sexual.trim() === '' || tipo_de_muestra.trim() === '' || 
            tipo_estudio.trim() === '' || fecha_ult_rev.trim() === '' || resp_pro_adn.trim() === ''
        ){
            cambiarError(true)
            Cargar(false)
            return            
        }
        cambiarError(false)

        let tipo_de_estudio = datos_generales.tipo_estudio === "1" ? 'PRIMERA VEZ' : 'SEGUIMIENTO'
        
        let muestra = {
            id:             datos_generales.id,
            codigo:         datos_generales.codigo,
            folio:          datos_generales.folio,
            genero:         'FEMENINO',
            fecha_nac:      datos_generales.fecha_nac,
            nombre:         datos_generales.nombre,
            edad:           datos_generales.edad,
            vida_sexual:    datos_generales.vida_sexual,
            muestra:        'CERVICO VAGINAL',
            tipo_de_muestra:datos_generales.tipo_de_muestra,
            tipo_estudio:   tipo_de_estudio,
            fecha_ult_rev:  datos_generales.fecha_ult_rev,
            resp_pro_adn:   datos_generales.resp_pro_adn,
            fecha_muestra:  datos_generales.fecha_muestra,
            nombre_medico:  datos_generales.nombre_medico,
            vph_16:         datos_generales.vph_16,
            vph_18:         datos_generales.vph_18,
            vph_ar:         datos_generales.vph_ar,
            ciclo_corte:    datos_generales.ciclo_corte,
            fecha_emision:  datos_generales.fecha_emision,
            marcador:       datos_generales.marcador,
            dias:           datos_generales.dias,
            calculo:        datos_generales.calculo
        } 
        
        Cargar(false)     
        
        swal({
            title: "Seguro?",
            text: "¿Todos los datos correctos?",
            icon: "info",
            buttons: {
                cancelar: {
                    text:'Verificar',
                    value:'Verificar'
                },
                aceptar: {
                    text:'Modificar',
                    value:'Modificar'
                }
            } 
          }).then(
              (value)=>{
                switch (value) {
                    case 'Modificar':
                        putMuestra(muestra) ? CargadoSatisfactoriamente(true) : CargadoSatisfactoriamente(false)
                        swal({
                            title: "Correcto",
                            text:'Registro de datos generales modificado correctamente',
                            icon:'success'
                        })
                        break;
                
                    default:
                        break;
                }
              }
            )
        
    }

    const {
        codigo,
        folio,
        genero, 
        fecha_nac,
        nombre,
        edad,
        vida_sexual,
        tipo_de_muestra,
        tipo_estudio,
        fecha_ult_rev,
        resp_pro_adn
    } = datos_generales;


    return (
        <form 
            id="form-1"
            style={{display:display ? 'block' : 'none'}}
            onSubmit={
                accion === 'captura' ?
                crearDatosGeneralesParaMuestra
                :
                modificarDatosGeneralesParaMuestra
            }
        >            
            <div className="row-formulario">
                <div className="elemento-formulario width-element-1">
                    <label>Codigo de Barras</label>
                    <input 
                        type="text" 
                        name="codigo"
                        value={codigo}
                        onChange={obtenerInfo}
                        className="elemento-formulario-input"
                    />
                </div>
                <div className="elemento-formulario width-element-1">
                    <label>Fecha de Nacimiento</label>
                    <div className="elemento-formulario-input row-formulario">
                        <input 
                            type="date" 
                            name="fecha_nac"
                            value={fecha_nac}
                            onChange={obtenerInfo}
                        />
                        <img 
                            src={Calendario} 
                            alt="Img"
                        />
                    </div>
                </div>
                <div className="elemento-formulario width-element-2">
                    <label>Nombre del Paciente</label>
                    <input 
                        type="text" 
                        name="nombre"
                        value={nombre} 
                        onChange={obtenerInfo}
                        placeholder="Nombre(s) / Apellido Paterno / Apellido Materno" 
                        className="elemento-formulario-input "
                    />
                </div>
                <div className="elemento-formulario width-element-4">
                    <label>Edad</label>
                    <input 
                        type="number" 
                        name="edad"
                        value={edad}
                        onChange={obtenerInfo}
                        className="elemento-formulario-input"
                    />
                </div>
                <div className="elemento-formulario width-element-3">
                    <label>Vida Sexual Activa</label>
                    <select 
                        className="elemento-formulario-input"
                        name='vida_sexual'
                        value={vida_sexual}
                        onChange={obtenerInfo}
                    >
                        <option value="SI">Si</option>
                        <option value="N0">No</option>
                    </select>
                </div>
            </div>
            <div className="row-formulario">
                <div className="elemento-formulario width-element-1">
                    <label>Folio</label>
                    <input 
                        type="text" 
                        name="folio"
                        value={folio}
                        onChange={obtenerInfo}
                        className="elemento-formulario-input"
                    />
                </div>
                <div className="elemento-formulario width-element-1">
                    <label>Genero</label>
                    <select 
                        className="elemento-formulario-input"
                        name='genero'
                        value={genero}
                        onChange={obtenerInfo}
                    >
                        <option value="FEMENINO">Femenino</option>
                    </select>
                </div>
                <div className="elemento-formulario width-element-1">
                    <label>Muestra</label>
                    <select className="elemento-formulario-input">
                        <option value="1">CERVICO VAGINAL</option>
                    </select>
                </div>
                <div className="elemento-formulario width-element-5">
                    <label>Tipo de Muestra</label>
                    <input 
                        type="text" 
                        name="tipo_de_muestra"
                        value={tipo_de_muestra}
                        onChange={obtenerInfo}
                        className="elemento-formulario-input "/>
                </div>
                <div className="elemento-formulario width-element-1">
                    <label>Tipo de Estudio</label>
                    <select 
                        className="elemento-formulario-input"
                        name='tipo_estudio'
                        value={tipo_estudio}
                        onChange={obtenerInfo}
                    >
                        <option value="1">PRIMERA VEZ</option>
                        <option value="2">SEGUIMIENTO</option>
                    </select>
                </div>
            </div>
            <div className="row-formulario">
                <div className="elemento-formulario width-element-1">
                    <label>Fecha de última revisión</label>
                    <div className="elemento-formulario-input row-formulario">
                        <input 
                            type="date" 
                            name="fecha_ult_rev"
                            value={fecha_ult_rev} 
                            onChange={obtenerInfo}
                        />
                        <img src={Calendario} alt="img"/>
                    </div>
                </div>
                <div className="elemento-formulario width-element-2">
                    <label>Solicitante</label>
                    <input 
                        type="text" 
                        name="resp_pro_adn"
                        value={resp_pro_adn}
                        onChange={obtenerInfo}
                        placeholder="ALEJANDRA GABRIELA CERVANTES VILLALOBOS" 
                        className="elemento-formulario-input"
                    />
                </div>
            </div>
            <div className="row-guardar">
                {accion === 'captura' ? 
                (
                    cargando ? (
                        <button type='submit'>Guardando</button>
                    ) : (
                        <button type='submit'>Guardar</button>
                    )
                ) : 
                (
                    cargando ? (
                        <button type='submit'>Modificando</button>
                    ) : (
                        <button type='submit'>Modificar</button>
                    )
                )}                
            </div>
            {
                cargado ? (
                    <p className="text-success text-right">
                        {accion === 'captura' ? 'Registro creado correctamente' : 'Registro modificado correctamente'}
                    </p>
                ) : null
            }
            {
                error ? (
                    <p className="text-danger text-right">
                            Todos los datos son obligatorios
                    </p>
                ) : null
            }
        </form>
    )
}

export default FormDatosGenerales

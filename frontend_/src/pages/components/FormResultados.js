import React,{useState, useContext} from 'react'
import Calendario from '../../assets/img/Icono-Calendario.png'

import swal from 'sweetalert'

import { MuestrasContext } from '../../context/MuestrasContext'

const FormResultados = ({display}) => {

    const { datos_generales,modificarDatosGenerales,putMuestra,accion } = useContext(MuestrasContext)

    const [error, cambiarError] = useState(false)

    const obtenerInfo = e => {
        modificarDatosGenerales({
            ...datos_generales,
            [e.target.name] : e.target.value
        })
    }
    const [cargando, Cargar] = useState(false)
    const [cargado, CargadoSatisfactoriamente] = useState(false)

    const modificarDatosGeneralesParaMuestra = e => {
        e.preventDefault()
        Cargar(true)
        // Revisar que no falte ningun dato
        if(
            fecha_muestra === null || nombre_medico === null || 
            ciclo_corte === null ||
            fecha_emision === null ||
            dias === null || calculo === null
        ){
            cambiarError(true)
            Cargar(false)
            return   
        }
        if(
            codigo.trim() === '' || folio.trim() === '' || genero.trim() === '' ||
            fecha_nac.trim() === '' || nombre.trim() === '' ||
            vida_sexual.trim() === '' || tipo_de_muestra.trim() === '' || 
            tipo_estudio.trim() === '' || fecha_ult_rev.trim() === '' || resp_pro_adn.trim() === '' ||
            fecha_muestra.trim() === '' || nombre_medico.trim() === '' || 
            fecha_emision.trim() === '' || dias.trim() === '' || calculo.trim() === ''
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
            vph_16:         datos_generales.vph_16 === null ? 'NO DETECTADO': datos_generales.vph_16,
            vph_18:         datos_generales.vph_18 === null ? 'NO DETECTADO': datos_generales.vph_18,
            vph_ar:         datos_generales.vph_ar === null ? 'NO DETECTADO': datos_generales.vph_ar,
            ciclo_corte:    datos_generales.ciclo_corte,
            fecha_emision:  datos_generales.fecha_emision,
            marcador:       datos_generales.marcador === null ? 'NO SE ENCONTRARON' : datos_generales.marcador,
            dias:           datos_generales.dias,
            calculo:        datos_generales.calculo
        } 
           

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

        
        Cargar(false)  
        
    }

    const {
        codigo,
        folio,
        genero, 
        fecha_nac,
        nombre,
        vida_sexual,
        tipo_de_muestra,
        tipo_estudio,
        fecha_ult_rev,
        resp_pro_adn,
        fecha_muestra,
        nombre_medico,
        vph_16,
        vph_18,
        vph_ar,
        ciclo_corte,
        fecha_emision,
        marcador,
        dias,
        calculo
    } = datos_generales;


    return (
        <form 
            id="form-2"
            style={{display: display ? 'block' : 'none'}}
            onSubmit={modificarDatosGeneralesParaMuestra}
        >
            <div className="row-formulario mb-0">
                
                <div className="elemento-formulario width-element-1">
                    <label>Fecha de la Muestra</label>
                    <div className="elemento-formulario-input row-formulario">
                        <input 
                            type="date" 
                            name="fecha_muestra"
                            value={fecha_muestra === null ? '' : fecha_muestra}
                            onChange={obtenerInfo}
                        />
                        <img src={Calendario} alt="img"/>
                    </div>
                </div>
                <div className="elemento-formulario width-element-6">
                    <p className="reultados">RESULTADOS</p>
                    <div className="row-formulario p-0 mb-0">
                        <div className="box-resultado">
                            <input 
                                type="text" 
                                name="vph_16"
                                value={vph_16 === null ? 'NO DETECTADO' : vph_16}
                                onChange={obtenerInfo}
                                className="elemento-formulario-input2"
                            />
                            <button>VPH 16</button>
                        </div>
                        <div className="box-resultado">
                            <input 
                                type="text" 
                                name="vph_18"
                                value={vph_18 === null ? 'NO DETECTADO' : vph_18}
                                onChange={obtenerInfo}
                                className="elemento-formulario-input2"
                            />
                            <button>VPH 16</button>
                        </div>
                        <div className="box-resultado">
                            <input 
                                type="text" 
                                name="vph_ar"
                                value={vph_ar === null ? 'NO DETECTADO' : vph_ar}
                                onChange={obtenerInfo}
                                className="elemento-formulario-input2"
                            />
                            <button>VPH AR</button>
                        </div>
                        <div className="box-resultado">
                            <input 
                                type="text" 
                                name="ciclo_corte"
                                value={ciclo_corte === null ? '0' : ciclo_corte}
                                onChange={obtenerInfo}
                                className="elemento-formulario-input2"
                            />
                            <button>CORTE</button>
                        </div>
                        
                    </div>
                    
                    <div className="row-formulario p-0">
                        <div className="elemento-formulario width-element-4">
                            <label>365</label>
                            <input 
                                type="number" 
                                name="dias"
                                value={dias === null || '' ? '0': dias}
                                onChange={obtenerInfo}
                                className="elemento-formulario-input" 
                            />
                        </div>
                        <div className="elemento-formulario width-element-3">
                            <label>Calculo</label>
                            <input 
                                type="number" 
                                name="calculo"
                                value={calculo === null ? '0':calculo}
                                onChange={obtenerInfo}
                                className="elemento-formulario-input" 
                            />
                            
                        </div>
                        <div className="elemento-formulario width-element-5">
                            <label style={{textAlign: "left"}}>Marcador</label>
                            <input 
                                type="text"
                                name="marcador" 
                                value={marcador === null ? 'NO SE ENCONTRARON':marcador}
                                onChange={obtenerInfo}
                                className="elemento-formulario-input "
                            />
                        </div>
                    </div>
                </div>
                <div className="elemento-formulario width-element-1">
                    <label>Fecha de la Emisión</label>
                    <div className="elemento-formulario-input row-formulario">
                        <input 
                            type="date" 
                            name="fecha_emision"
                            value={fecha_emision === null ? '' : fecha_emision}
                            onChange={obtenerInfo}
                        />
                        <img src={Calendario} alt="img"/>
                    </div>
                </div>
                
            </div>
            <div className="row-formulario my-0">
                <div className="elemento-formulario width-element-2">
                    <label>Nombre del Médico</label>
                    <input 
                        type="text" 
                        name="nombre_medico" 
                        value={nombre_medico === null ? '':nombre_medico}
                        onChange={obtenerInfo}
                        className="elemento-formulario-input"
                        placeholder='Nombre del médico'
                    />
                </div>

                <div className="elemento-formulario width-element-2">
                        <label>Nombre del Responsable del proceso ADN</label>
                        <input 
                            type="text" 
                            name="resp_pro_adn"
                            value={resp_pro_adn === null? '':resp_pro_adn}
                            onChange={obtenerInfo}
                            placeholder="ALEJANDRA GABRIELA CERVANTES VILLALOBOS" 
                            className="elemento-formulario-input"
                        />
                    </div>
            </div>
            
            {
                cargado ? (
                    <p className="text-success text-right">
                            Registro creado correctamente
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
        </form>
    )
}

export default FormResultados

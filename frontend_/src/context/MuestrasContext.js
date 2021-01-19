import React, {createContext, useState} from 'react'
import axios from 'axios'
import swal from 'sweetalert'

export const MuestrasContext = createContext()

const MuestrasProvider = (props) =>{

    const [datos_generales, modificarDatosGenerales] = useState({
        codigo:'',
        folio:'',
        genero:'FEMENINO',
        fecha_nac:'',
        nombre:'',
        edad:0,
        vida_sexual:'SI',
        muestra:'CERVICO VAGINAL',
        tipo_de_muestra:'',
        tipo_estudio:"1",
        fecha_ult_rev:'',
        resp_pro_adn:'',
        
        fecha_muestra:'',
        nombre_medico:'',
        vph_16:'NO DETECTADO',
        vph_18:'NO DETECTADO',
        vph_ar:'NO DETECTADO',
        ciclo_corte:'NO DETECTADO',
        fecha_emision:'',
        marcador:'NO SE ENCONTRARON',
        dias:'0',
        calculo:'0.0'
    });
    const [muestras, modificarMuestras] = useState([])
    const [accion, modificarAccion] = useState('captura')
    const [busqueda, buscarNuevaMuestra] = useState(false)
    const [registros_muestras, actualizarRegistros] = useState([])


    async function getMuestras(muestras_state) {
        if (muestras_state.length === 0){
            try {
                // const response = await axios.get('http://pharma.pxl.com.devel/api/muestra')
                const response = await axios.get('https://pharma2.pxlatelier.com/api/muestra')
                var muestras_nuevas = response.data.data

                modificarMuestras(muestras_nuevas)
                
            } catch (error) {
                
            }
        }
        
    }
    async function getMuestra(id) {
        
            try {
                // const response = await axios.get(`http://pharma.pxl.com.devel/api/muestra/${id}`)
                const response = await axios.get(`https://pharma2.pxlatelier.com/api/muestra/${id}`)
                var muestras_nuevas = response.data.data

                buscarMuestra(muestras_nuevas)
                buscarNuevaMuestra(true)
                
            } catch (error) {
                swal({
                    title: "No se encontró",
                    text: "No existe tal registro",
                    icon: "error"
                })
            }
        
    }
    async function postMuestra(json_muestra) {
        
        const {
                codigo,
                folio,
                genero,
                fecha_nac,
                nombre,
                edad,
                vida_sexual,
                muestra,
                tipo_de_muestra,
                tipo_estudio,
                fecha_ult_rev,
                resp_pro_adn
        } = json_muestra


        try {
            let params = {codigo,folio,genero,fecha_nac,
                nombre,edad,vida_sexual,muestra,tipo_de_muestra,
                tipo_estudio,fecha_ult_rev,resp_pro_adn
            }
        // const response = await axios.get('http://pharma.pxl.com.devel/api/muestra');
        const {data} = await axios.post('https://pharma2.pxlatelier.com/api/muestra', {
            json: JSON.stringify(params)
        });
            
        const nueva_muestra = data.data 
           
        var muestra_formateada = {
            id:nueva_muestra.id,
            codigo:nueva_muestra.codigo,
            folio:nueva_muestra.folio,
            genero:nueva_muestra.genero,
            fecha_nac:nueva_muestra.fecha_nac,
            nombre:nueva_muestra.nombre,
            edad:nueva_muestra.edad,
            vida_sexual:nueva_muestra.vida_sexual,
            muestra:nueva_muestra.muestra,
            tipo_de_muestra:nueva_muestra.tipo_de_muestra,
            tipo_estudio:nueva_muestra.tipo_estudio,
            fecha_ult_rev:nueva_muestra.fecha_ult_rev,
            resp_pro_adn:nueva_muestra.resp_pro_adn,

            fecha_muestra:'',
            nombre_medico:'',
            vph_16:'',
            vph_18:'',
            vph_ar:'',
            ciclo_corte:'',
            fecha_emision:'',
            marcador:'',
            dias:'',
            calculo:''
        }

        //Agregar la muestra al state
        modificarMuestras([
            ...muestras,
            muestra_formateada
        ])

        //Regresar datos en blanco
        limpiarData()

        return true
            
        } catch (error) {
            return false
        }
    }
    async function putMuestra(json_muestra) {
        
        const {
                id,
                codigo,
                folio,
                genero, 
                fecha_nac,
                nombre,
                edad,
                vida_sexual,
                muestra,
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
        } = json_muestra


        try {
            let params = {codigo,folio,genero,fecha_nac,
                nombre,edad,vida_sexual,muestra,tipo_de_muestra,
                tipo_estudio,fecha_ult_rev,resp_pro_adn,fecha_muestra,
                nombre_medico,vph_16,vph_18,vph_ar,ciclo_corte,
                fecha_emision,marcador,dias,calculo
            }
        // const link = `http://pharma.pxl.com.devel/api/muestra/${id}`
        const link = `https://pharma2.pxlatelier.com/api/muestra/${id}`
        const {data} = await axios.put(link, {
            json: JSON.stringify(params)
        });
            
        const nueva_muestra = data.data 
           
        var muestra_formateada = {
            id:nueva_muestra.id,
            codigo:nueva_muestra.codigo,
            folio:nueva_muestra.folio,
            genero:nueva_muestra.genero,
            fecha_nac:nueva_muestra.fecha_nac,
            nombre:nueva_muestra.nombre,
            edad:nueva_muestra.edad,
            vida_sexual:nueva_muestra.vida_sexual,
            muestra:nueva_muestra.muestra,
            tipo_de_muestra:nueva_muestra.tipo_de_muestra,
            tipo_estudio:nueva_muestra.tipo_estudio,
            fecha_ult_rev:nueva_muestra.fecha_ult_rev,
            resp_pro_adn:nueva_muestra.resp_pro_adn,

            fecha_muestra:nueva_muestra.fecha_muestra,
            nombre_medico:nueva_muestra.nombre_medico,
            vph_16:nueva_muestra.vph_16,
            vph_18:nueva_muestra.vph_18,
            vph_ar:nueva_muestra.vph_ar,
            ciclo_corte:nueva_muestra.ciclo_corte,
            fecha_emision:nueva_muestra.fecha_emision,
            marcador:nueva_muestra.marcador,
            dias:nueva_muestra.dias,
            calculo:nueva_muestra.calculo
        }

        //Buscar registro a eliminar
        const muestrasActualizadas = muestras.filter(muestra => muestra.id !== muestra_formateada.id)
        muestrasActualizadas.push(muestra_formateada)
        modificarMuestras(muestrasActualizadas)

        return true
            
        } catch (error) {
            return false
        }
    }
    async function busquedaEspecifica(json_muestra){
        
        const {
                categoria,
                busqueda
        } = json_muestra


        try {
            let params = {categoria,busqueda}
            // axios.post('http://pharma.pxl.com.devel/api/busqueda', {
            axios.post('https://pharma2.pxlatelier.com/api/busqueda', {
                json: JSON.stringify(params)
            })
            .then(response=>{
                //Encontro el registro
                buscarMuestra ( response.data.busqueda[0] )
            })
            .catch(error => {
                //No encontro el registro
                swal({
                    title: "No se encontró",
                    text: "No existe tal registro",
                    icon: "error"})
            })
            

           
            
        } catch (error) {
            return false
        } 
    }
    async function busquedaGrupal(json_muestra){
        
        const {
                categoria,
                busqueda
        } = json_muestra


        try {
            let params = {categoria,busqueda}
            // axios.post('http://pharma.pxl.com.devel/api/busqueda_grupal', {
            axios.post('https://pharma2.pxlatelier.com/api/busqueda_grupal', {
                json: JSON.stringify(params)
            })
            .then(response=>{
                //Encontro el registro
                actualizarRegistros ( response.data.busqueda )
            })
            .catch(error => {
                //No encontro el registro
                actualizarRegistros([])
                swal({
                    title: "No se encontró",
                    text: "No existe tal registro",
                    icon: "error"})
            })
            

           
            
        } catch (error) {
            return false
        } 
    }

    function buscarMuestra(data){
        if (data === undefined){
            return false  
        }else{
            modificarDatosGenerales(data)
            return true  
        }      
    }

    function limpiarData(){
        modificarDatosGenerales({
            codigo:'',
            folio:'',
            genero:'FEMENINO',
            fecha_nac:'',
            nombre:'',
            edad:0,
            vida_sexual:'SI',
            muestra:'CERVICO VAGINAL',
            tipo_de_muestra:'',
            tipo_estudio:"1",
            fecha_ult_rev:'',
            resp_pro_adn:'',
            fecha_muestra:'',
            nombre_medico:'',
            vph_16:'NO DETECTADO',
            vph_18:'NO DETECTADO',
            vph_ar:'NO DETECTADO',
            ciclo_corte:'0',
            fecha_emision:'',
            marcador:'NO SE ENCONTRARON',
            dias:'0',
            calculo:'0.00'
        })
    }

    return (
        <MuestrasContext.Provider
            value={{
                datos_generales,
                modificarDatosGenerales,
                muestras,
                getMuestras,
                postMuestra, putMuestra,
                buscarMuestra,
                accion, modificarAccion,
                busqueda, buscarNuevaMuestra,
                limpiarData, busquedaEspecifica, busquedaGrupal,
                registros_muestras, getMuestra
            }}
        >
            {props.children}
        </MuestrasContext.Provider>
    )
}
export default MuestrasProvider
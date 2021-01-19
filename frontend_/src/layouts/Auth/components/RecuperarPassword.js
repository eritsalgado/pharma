import React, {useState} from 'react'
import axios from 'axios'

import styled from '@emotion/styled'

const InputForm = styled.input`
    width:100%;
    color:white;
    background-color:#045680;
    border:none;
    text-align:center;
    padding: 5px;
    border-radius: 5px;
    outline:none;
    -webkit-box-shadow: 3px 3px 5px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 3px 3px 5px -1px rgba(0,0,0,0.75);
    box-shadow: 3px 3px 5px -1px rgba(0,0,0,0.75);

    ::placeholder{
        color:white;
        text-align:left;
        font-size:10px;
    }
`
const LoginButton = styled.button`
    background-color:transparent;
    width: 50%;
    padding: 3px;
    border: 1px white solid;
    border-radius: 10px;

    color:white;
    font-size:1.2rem;
    outline:none!important;
`


const RecuperarPassword = () => {

    const [datos, guardarDatos] = useState({
        email:''
    })
    const [error, cambiarError] = useState(false)
    const [cargando, Cargar] = useState(false)
    const [enviado, Verificar] = useState(false)
    const [mensaje, cambiarMensaje] = useState()

    const obtenerInfo = e => {
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const solicitarAlta = async e => {
        e.preventDefault()
        Cargar(true)
        if(email.trim() === ''){
            cambiarError(true)
            Cargar(false)
            Verificar(false)
            return
        }
        cambiarError(false)

        //Si no hay error, enviar petición a la API alta
        if(!error){
            // const {data} = await axios.post('http://pharma.pxl.com.devel/api/recover', {
            const {data} = await axios.post('https://pharma2.pxlatelier.com/api/recover', {
                json: JSON.stringify(datos)
            })

            if(data.status !== "error"){
                Verificar(true)
                cambiarMensaje(<p className="text-white">Se ha enviado un 
                mensaje a tu correo, por favor 
                verifica esta información.</p>)
                Cargar(false)
            }else{
                Verificar(true)
                cambiarMensaje(
                <p className="text-warning">{data.message}</p>)
                Cargar(false)
            }
            
        }     
    }


    const {email} = datos;

    return (
        <form>
            <div className="row mb-2">
                <div className="col">
                    <label htmlFor="usuario">
                        Ingresa tú Usuario
                    </label>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-8">
                    <InputForm 
                        type="text"
                        placeholder="Email:"
                        id="usuario"
                        name="email"
                        value={email}
                        autoComplete="off"
                        autoFocus
                        onChange={obtenerInfo}
                    />
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-8 pt-5">
                        <LoginButton  className='brad'
                            onClick={e => {solicitarAlta(e)}}
                            disabled={email.length<5}
                        >
                            {cargando ? 'Verificando...' : 'Enviar'}
                        </LoginButton>
                </div>
            </div>
            {enviado ?
            (<div className="row">
                <div className="col pt-3">
                    {mensaje}
                </div>
            </div>) : 
            null}

            {error ?
            (<div className="row">
                <div className="col text-warning">
                    Debe llenar los campos
                </div>
            </div>) : 
            null}
        </form>
    )
}

export default RecuperarPassword
import React,{useState, useContext} from 'react'
import {Redirect} from 'react-router-dom'

import { UsuarioContext } from '../../../context/UsuarioContext'
import Auth from '../../../utils/Auth'
import setAuthToken from '../../../utils/setAuthToken'

import styled from '@emotion/styled'
import axios from 'axios'

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

    font-size: 15px;
    /* font-family: 'Akzidenz'; */

    ::placeholder{
        color:white;
        text-align:left;
        font-size:10px;
    }
`
const LinkButton = styled.button`
    border:none;
    background-color:transparent;
    color: white;
    text-decoration: underline white;
    outline:none;
    font-size: .7rem;

    :hover{
        color: cyan;
        text-decoration: underline cyan;
        outline:none;
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


const Login = ({guardarMenu}) => {
   
    const { actualizarUsuario,actualizarSesion } = useContext(UsuarioContext)

    const [datos, guardarDatos] = useState({email:'',password:''})
    const [error, cambiarError] = useState(false)
    const [mensajeError, nuevoMensaje] = useState()
    const [cargando, Cargar] = useState(false)

    const obtenerInfo = e => {
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    
    if (Auth.isAuthenticated()) return <Redirect to='/portal/dashboard'/>

    const handleLink = () => {
        guardarMenu({
            actual: 'RECUPERAR',
            anterior: 'NUEVO USUARIO',
            siguiente: 'INICIAR SESIÓN' 
        })
    }

    const Loguear = async e => {
        e.preventDefault()
        Cargar(true)
        if(email.trim() === '' || password.trim() === ''){
            cambiarError(true)
            nuevoMensaje('Parece que faltan algunos datos')
            Cargar(false)
            return
        }
        cambiarError(false)
        // setTimeout(() => {
        //     Cargar(false)
        //     console.log('enviar datos')   
        // }, 3000);

        //Si no hay error, enviar petición a la API login
        if(!error){
            // const {data} = await axios.post('http://pharma.pxl.com.devel/api/login', {
            const {data} = await axios.post('https://pharma2.pxlatelier.com/api/login', {
                json: JSON.stringify(datos)
            })
            if(typeof(data) === 'string'){
                //Significa que devuelve un JWT (acceso correcto)
                let token = data
                
                localStorage.setItem("userToken", token);
                //Incluir el token en todos los movimientos de axios
                setAuthToken(token)
                //Iniciar sesión
                Auth.login()

                const {id,email,nombre,rango,empresa} = Auth.getProfile() 
                
                actualizarUsuario({
                    id,email,nombre,rango,empresa
                })
                actualizarSesion(true)

                // props.history.push("/dashboard")
                window.location = ('/portal/dashboard')
                // return <Redirect to='/portal/dashboard'/>
            }else{
                
                cambiarError(true)
                nuevoMensaje('El login ha fallado, verifique su usuario y contraseña')

            }
            
        }
        Cargar(false)
        
    }


    const {email, password} = datos;

    return (
        <form
            onSubmit={Loguear}
            autoComplete="off"
        >
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
                        className='aki'
                    />
                </div>
            </div>
            <div className="row mt-4 mb-2">
                <div className="col">
                    <label htmlFor="password">
                        Ingresa tú Contraseña
                    </label>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-8">
                    <InputForm 
                        type="password"
                        placeholder="Contraseña:"
                        id="password"
                        name="password"
                        value={password}
                        autoComplete="off"
                        onChange={obtenerInfo}
                        className='aki'
                    />
                </div>
            </div>
            <div className="row mt-2 mb-5">
                <div className="col">
                    <LinkButton 
                        onClick={e => {
                                e.preventDefault()
                                handleLink()
                            }
                        }
                    >¿Olvidaste tu Contraseña?</LinkButton>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-8 pt-3">
                        <LoginButton className='brad'>
                            {cargando ? 'Verificando...' : 'Aceptar'}
                        </LoginButton>
                </div>
            </div>
            {error ?
            (<div className="row">
                <div className="col text-warning">
                    {mensajeError}
                </div>
            </div>) : 
            null}
            
        </form>
    )
}

export default Login

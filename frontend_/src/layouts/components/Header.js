import React, { useContext,useEffect } from 'react'
import styled from '@emotion/styled'

import Auth from '../../utils/Auth'
import {Redirect} from 'react-router-dom'

import LogoGris from '../../assets/img/Logo-Pharma-gris.png'
import Bienvenida from '../../assets/img/Bienvenida.png'
import Exit from '../../assets/img/Logout.png'

import { MuestrasContext } from '../../context/MuestrasContext'

const StyledHeader = styled.header`
    position:fixed;
    background: rgb(255,255,255);
    background: -moz-linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(210,183,210,1) 65%, rgba(210,183,210,1) 100%);
    background: -webkit-linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(210,183,210,1) 65%, rgba(210,183,210,1) 100%);
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(210,183,210,1) 65%, rgba(210,183,210,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#d2b7d2",GradientType=1);
    z-index:2;
`
const LogoImg = styled.img`
    margin: auto 0 auto 15px;
    height: 7rem;
`
const BienvenidaImg = styled.img`
    height: 50%;
    margin: auto;
    padding: 10px 0 0 0;
    width: auto;
`
const ExitButton = styled.img`
    height: 60px;
    width: auto;
    margin: auto;

    :hover{
        cursor:pointer;
    }
`

const Header = () => {
    //La primera vez que cargue el sistema, obtener TODAS las muestras
    const { muestras, getMuestras } = useContext(MuestrasContext)
    useEffect(()=> {
        obtenerMuestras()
    },[])

    const obtenerMuestras = () => {
        getMuestras(muestras)
    }
    
    if (!Auth.isAuthenticated()) return <Redirect to='/portal/login'/>

    const cerrarSesion = e => {
        e.preventDefault()
        Auth.logout()
        window.location= '/portal/login' 
    }

    return (
        <StyledHeader className="col-12">
            <label htmlFor="sidebar_check">
                <i className="fas fa-bars" id="sidebar_btn"></i>
            </label>
            <div className="row pt-2">
                <div className="col-6 col-sm-3 text-left">
                    <LogoImg src={LogoGris} alt="Logo"/>
                </div>
                <div className="col-sm-6 d-none d-sm-block text-center">
                    <BienvenidaImg src={Bienvenida} alt="Bienvenido al sistema"/>
                    <p>{Auth.getProfile().nombre}</p>
                </div>
                <div className="col-6 col-sm-3 text-right mt-4">
                    <ExitButton 
                        src={Exit} 
                        alt="Salir" 
                        onClick={e=>{
                           cerrarSesion(e)
                        }}
                    />
                </div>
            </div>
        </StyledHeader>
    )
}

export default Header

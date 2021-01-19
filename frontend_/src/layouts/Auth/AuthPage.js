import React,{useState, useEffect} from 'react'
import styled from '@emotion/styled'

import Login from './components/Login'
import NuevoUsuario from './components/NuevoUsuario'
import RecuperarPassword from './components/RecuperarPassword'

import fondo_blanco from '../../assets/img/Fondo-login-Izq-2.jpg'
import logo_blanco from '../../assets/img/Logo-Pharma-blanco.png'
import next from '../../assets/img/Flecha-der-Blanca.png'
import after from '../../assets/img/Flecha-Izq-Blanca.png'


const AuthForm = styled.div`
    background: rgba(83,141,173,1);
    background: -moz-linear-gradient(left, rgba(83,141,173,1) 0%, rgba(6,111,163,1) 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(83,141,173,1)), color-stop(100%, rgba(6,111,163,1)));
    background: -webkit-linear-gradient(left, rgba(83,141,173,1) 0%, rgba(6,111,163,1) 100%);
    background: -o-linear-gradient(left, rgba(83,141,173,1) 0%, rgba(6,111,163,1) 100%);
    background: -ms-linear-gradient(left, rgba(83,141,173,1) 0%, rgba(6,111,163,1) 100%);
    background: linear-gradient(to right, rgba(83,141,173,1) 0%, rgba(6,111,163,1) 100%);
    height:100vh;
    color:white;
`
const LogoBlanco = styled.img`
    width: auto;
    height: auto;
    max-height: calc(10rem + 2vmin);
    margin: auto;
`
const SectionSpan = styled.span`
    color: white;
    font-size:11px;

    border: .5px white solid ;
    padding: 15px 6px;
    border-radius: 7px;
    margin-left:10px;
    margin-right:10px;

    background: rgba(0,168,214,1);
    background: -moz-linear-gradient(left, rgba(0,168,214,1) 0%, rgba(0,167,213,1) 1%, rgba(0,112,155,1) 68%, rgba(0,86,127,1) 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(0,168,214,1)), color-stop(1%, rgba(0,167,213,1)), color-stop(68%, rgba(0,112,155,1)), color-stop(100%, rgba(0,86,127,1)));
    background: -webkit-linear-gradient(left, rgba(0,168,214,1) 0%, rgba(0,167,213,1) 1%, rgba(0,112,155,1) 68%, rgba(0,86,127,1) 100%);
    background: -o-linear-gradient(left, rgba(0,168,214,1) 0%, rgba(0,167,213,1) 1%, rgba(0,112,155,1) 68%, rgba(0,86,127,1) 100%);
    background: -ms-linear-gradient(left, rgba(0,168,214,1) 0%, rgba(0,167,213,1) 1%, rgba(0,112,155,1) 68%, rgba(0,86,127,1) 100%);
    -webkit-box-shadow: 5px 4px 7px -2px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 4px 7px -2px rgba(0,0,0,0.75);
    box-shadow: 5px 4px 7px -2px rgba(0,0,0,0.75);

`


const AuthLayout = () => {

    const [menu, guardarMenu] = useState({
        actual:'INICIAR SESIÓN',
        siguiente:'NUEVO USUARIO',
        anterior:'RECUPERAR'
    })


    const [comp, ActComp] = useState(<Login
                                        guardarMenu={guardarMenu}
                                    />)

    function actualizarMenu (opcion) {
        let actual
        let siguiente
        let anterior
        
        switch (opcion) {
            case 'INICIAR SESIÓN':
                    actual = 'INICIAR SESIÓN'
                    siguiente = 'NUEVO USUARIO'
                    anterior = 'RECUPERAR'  
                break;
            case 'NUEVO USUARIO':
                    actual = 'NUEVO USUARIO'
                    anterior = 'INICIAR SESIÓN'
                    siguiente = 'RECUPERAR'  
                break;
            case 'RECUPERAR':
                    actual = 'RECUPERAR'
                    anterior = 'NUEVO USUARIO'
                    siguiente = 'INICIAR SESIÓN' 
                
                break;
            default:
                break;
        }

        guardarMenu({
            actual,siguiente,anterior
        })
        
    }

    useEffect(()=> {
        
        let componente= <Login
            guardarMenu={guardarMenu}
        />  
        switch (menu.actual) {
            case 'INICIAR SESIÓN':
                    componente = <Login
                                    guardarMenu={guardarMenu}
                                />
                break;
            case 'NUEVO USUARIO':
                componente = <NuevoUsuario/>
                break;
            case 'RECUPERAR':
                    componente = <RecuperarPassword/>                
                break;
            default:
                break;
        }
        ActComp(componente)
    },[menu])



    const {actual,anterior,siguiente} = menu

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center" style={{height: '100vh'}}>
                <div className="col-md-6 col-lg-8 col-xl-9 d-none d-sm-none d-md-block">
                    <img src={fondo_blanco} className="img-fluid rounded mx-auto d-block" alt="Imagen de fondo" style={{width: '70%'}} />
                </div>
                <div className="text-center col-12 col-md-6 col-lg-4 col-xl-3" style={{padding:0}}>
                    <AuthForm>
                        <div className="container">
                            <div className="row">
                                <div className="col mt-5 mb-5">
                                    <LogoBlanco src={logo_blanco} alt="Logo"/>
                                </div>
                            </div>
                            <div className="row mt-5 mb-5">
                                <div className="col-12 text-center mt-1">
                                    <button 
                                        style={{backgroundColor:'transparent', 
                                        border: 'none', 
                                        outline:'none'
                                        }}
                                        onClick={() => actualizarMenu(anterior)}
                                    >
                                        <img src={after} alt="After"  style={{height:"35px"}}/>
                                    </button>
                                    <SectionSpan>
                                        {actual}
                                    </SectionSpan>
                                    <button 
                                        style={{backgroundColor:'transparent', 
                                        border: 'none', 
                                        outline:'none'
                                        }}
                                        onClick={() => actualizarMenu(siguiente)}
                                    >
                                        <img src={next} alt="Next" style={{height:"35px"}}/>
                                    </button>
                                </div>
                            </div>


                            {/* Dependiendo de la selección, cargar el componente */}
                            
                            {comp}

                        </div>
                    </AuthForm>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout

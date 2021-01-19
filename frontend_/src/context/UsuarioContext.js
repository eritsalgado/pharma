import React, {createContext, useState, useEffect} from 'react'
import auth from '../utils/Auth'

export const UsuarioContext = createContext()

const UsuarioProvider = (props) =>{

    const [usuario, actualizarUsuario] = useState({
      id:'',
      email: '',
      nombre: '',
      rango:''
    })
    const [sesion, actualizarSesion] = useState(false)

    useEffect(() =>{
        if(auth.isAuthenticated()){
            actualizarSesion(true)
            const {id,email,nombre,rango} = auth.getProfile() 
            
            actualizarUsuario({
                id,email,nombre,rango
            })
        }
    },[])

    


    return (
        <UsuarioContext.Provider
            value={{
                usuario,
                actualizarUsuario,
                sesion,
                actualizarSesion
            }}
        >
            {props.children}
        </UsuarioContext.Provider>
    )
}
export default UsuarioProvider
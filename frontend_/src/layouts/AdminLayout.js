import React from 'react'
// import Menu from './components/Menu'
import MenuAlt from './components/MenuAlt'
import Header from './components/Header'

import MuestrasProvider from '../context/MuestrasContext'

import '../assets/css/styles.css'



const AdminLayout = ({children}) => {


    return(
        <MuestrasProvider>
            <input type="checkbox" id="sidebar_check"/>
            <Header/>
            <MenuAlt/>
            <div className='content'>
                {children}
            </div>
        </MuestrasProvider>
    )
}

export default AdminLayout
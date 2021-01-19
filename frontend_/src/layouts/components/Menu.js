import React from 'react'
import styled from '@emotion/styled'
import {Link} from 'react-router-dom'

import FondoSidebar from '../../assets/img/Fondo-Menu-sistema.png'

const Sidebar = styled.div`
    background-image: url(${FondoSidebar});
    margin-top: 142px;
    padding-top: 30px;
    position:fixed;
    left:0;
    width:250px;
    height:100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`
const MenuButton = styled.button`

    width: 150px;
    padding: 4px;
    border-radius: 7px;
    border: 1px #c0c0c0 solid;
    font-weight:550;

    margin: 50px 0;
    
    /* Sombras */
    -webkit-box-shadow: 7px 6px 21px -9px rgba(0,0,0,0.75);
    -moz-box-shadow: 7px 6px 21px -9px rgba(0,0,0,0.75);
    box-shadow: 7px 6px 21px -9px rgba(0,0,0,0.75);

    /* Degradado */
    background: rgba(210,183,210,0.82);
    background: -moz-linear-gradient(left, rgba(210,183,210,0.82) 0%, rgba(210,183,210,0.81) 0%, rgba(255,255,255,0.81) 43%, rgba(255,255,255,0.81) 59%, rgba(210,183,210,0.81) 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(210,183,210,0.82)), color-stop(0%, rgba(210,183,210,0.81)), color-stop(43%, rgba(255,255,255,0.81)), color-stop(59%, rgba(255,255,255,0.81)), color-stop(100%, rgba(210,183,210,0.81)));
    background: -webkit-linear-gradient(left, rgba(210,183,210,0.82) 0%, rgba(210,183,210,0.81) 0%, rgba(255,255,255,0.81) 43%, rgba(255,255,255,0.81) 59%, rgba(210,183,210,0.81) 100%);
    background: -o-linear-gradient(left, rgba(210,183,210,0.82) 0%, rgba(210,183,210,0.81) 0%, rgba(255,255,255,0.81) 43%, rgba(255,255,255,0.81) 59%, rgba(210,183,210,0.81) 100%);
    background: -ms-linear-gradient(left, rgba(210,183,210,0.82) 0%, rgba(210,183,210,0.81) 0%, rgba(255,255,255,0.81) 43%, rgba(255,255,255,0.81) 59%, rgba(210,183,210,0.81) 100%);
    background: linear-gradient(to right, rgba(210,183,210,0.82) 0%, rgba(210,183,210,0.81) 0%, rgba(255,255,255,0.81) 43%, rgba(255,255,255,0.81) 59%, rgba(210,183,210,0.81) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d2b7d2', endColorstr='#d2b7d2', GradientType=1 );
    

    :hover{
        background: rgba(188,224,238,0.82);
        background: -moz-linear-gradient(left, rgba(188,224,238,0.82) 0%, rgba(255,255,255,0.82) 43%, rgba(255,255,255,0.81) 59%, rgba(188,224,238,0.81) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(188,224,238,0.82)), color-stop(43%, rgba(255,255,255,0.82)), color-stop(59%, rgba(255,255,255,0.81)), color-stop(100%, rgba(188,224,238,0.81)));
        background: -webkit-linear-gradient(left, rgba(188,224,238,0.82) 0%, rgba(255,255,255,0.82) 43%, rgba(255,255,255,0.81) 59%, rgba(188,224,238,0.81) 100%);
        background: -o-linear-gradient(left, rgba(188,224,238,0.82) 0%, rgba(255,255,255,0.82) 43%, rgba(255,255,255,0.81) 59%, rgba(188,224,238,0.81) 100%);
        background: -ms-linear-gradient(left, rgba(188,224,238,0.82) 0%, rgba(255,255,255,0.82) 43%, rgba(255,255,255,0.81) 59%, rgba(188,224,238,0.81) 100%);
        background: linear-gradient(to right, rgba(188,224,238,0.82) 0%, rgba(255,255,255,0.82) 43%, rgba(255,255,255,0.81) 59%, rgba(188,224,238,0.81) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#bce0ee', endColorstr='#bce0ee', GradientType=1 );
    }
`

const Menu = () => {
    return (
        <Sidebar className='text-center sidebar'>
            <MenuButton>
                <Link 
                    to='/portal/1'
                    style={{textDecoration:'none', color:'black'}}
                >
                    Captura de datos
                </Link>
            </MenuButton>
            <MenuButton>
                <Link 
                    to='/portal/2'
                    style={{textDecoration:'none', color:'black'}}
                >
                    Editar Captura
                </Link>
            </MenuButton>
            <MenuButton>
                <Link 
                    to='/portal/3'
                    style={{textDecoration:'none', color:'black'}}
                >
                    Busquedas
                </Link>
            </MenuButton>
        </Sidebar>
    )
}

export default Menu

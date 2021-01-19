import React from 'react'
import Up from '../../assets/img/Flecha_arriba.png'
import Down from '../../assets/img/Flecha_abajo.png'

const HeaderForm = ({title,cambiarDisplay}) => {

    const displayState = ( e,state ) =>{
        e.preventDefault();
        cambiarDisplay(state)
    }
    return (
        <div className="header-formulario">
            <div className="elements-header-formulario">
                <p>{title}</p>
                <div>
                    <img src={Up} alt="+" 
                        id="down-1" 
                        className="flecha-img"
                        onClick={e=> {
                            displayState(e, false)
                        }}
                    />
                    <img src={Down} alt="-" 
                        id="up-1" 
                        className="flecha-img"
                        onClick={e=> {
                            displayState(e, true)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default HeaderForm

import React from 'react'
import './ToggleMenu.css'

const ToggleMenu = props => {

    return(
        <div className="ToggleMenu">
            <span onClick={props.onClick} className="toggle-button">
                <div className="menu-bar"></div>
                <div className="menu-bar"></div>
                <div className="menu-bar"></div>
            </span>     
        </div>
    )
}

export default ToggleMenu
import React from 'react'
import './Navbar.css'
import {NavLink} from 'react-router-dom'
import ToggleMenu from '../UI/ToggleMenu/ToggleMenu'



const Navbar = props => {
    const renderLink = (list) => {
        return list.map((item, index)=> {
            return (
                <li key={index}><NavLink  activeClassName="active" to={item.to}>{item.title}</NavLink></li>
            )
        })
    }

    return(
        <div className="Navbar">
            <div className="container">
            {props.toggleMenu ? <ToggleMenu onClick={props.leftBarToggle}/> : null}
                <div className="Navbar-wrapper">
                    <NavLink className="Navbar-brand" to="/">CRM-Small</NavLink>
                    {props.navLink ? <ul className="Navbar-menu">{renderLink(props.navLink)}</ul> : null}
                </div>
            </div>
        </div>
    )
}

export default Navbar
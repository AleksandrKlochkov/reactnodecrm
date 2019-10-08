import React from 'react'
import './Navbar.css'
import {NavLink} from 'react-router-dom'

const Navbar = props => {
    return(
        <div className="Navbar">
            <div className="container">
                <div className="Navbar-wrapper">
                    <NavLink className="Navbar-brand" to="/">CRM-Small</NavLink>
                    <ul className="Navbar-menu">
                        <li><NavLink activeClassName="active" to="/login">Войти</NavLink></li>
                        <li><NavLink  to="/register">Регистарция</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
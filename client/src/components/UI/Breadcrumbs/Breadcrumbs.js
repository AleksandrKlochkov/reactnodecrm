import React from 'react'
import './Breadcrumbs.css'

import {NavLink} from 'react-router-dom'

const Breadcrumbs = props => {
    return(
        <div className="Breadcrumbs">
            <ul>
                <li><NavLink exact to="/" className="item">Главная</NavLink></li>
                <li><i className="fa fa-angle-right" aria-hidden="true"></i></li>
                <li><NavLink to="category" className="item">Категории</NavLink></li>
                <li><i className="fa fa-angle-right" aria-hidden="true"></i></li>
            </ul>
        </div>
    )
}

export default Breadcrumbs

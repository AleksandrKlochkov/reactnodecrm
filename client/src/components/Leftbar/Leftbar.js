import React from 'react'
import './Leftbar.css'

import {NavLink} from 'react-router-dom'
import Search from '../UI/Search/Search'
import UserPanel from '../UserPanel/UserPanel'


const Leftbar = props => {
    return(
        <div className="Leftbar">
            <UserPanel />
            <Search/>
            {/* <ul>
                <li><NavLink to="/home"><i style={{fontSize:19.6}} className="fa fa-home" aria-hidden="true"></i>Главная</NavLink></li>
                <li><NavLink to="/analytics"><i className="fa fa-bar-chart" aria-hidden="true"></i> CRM-аналитика</NavLink></li>
                <li><NavLink to="/order"><i className="fa fa-shopping-basket" aria-hidden="true"></i> Заказы</NavLink></li>
                <li><NavLink to="/category"><i className="fa fa-list-alt" aria-hidden="true"></i> Кактегории</NavLink></li>
                <li><NavLink to="/position"><i className="fa fa-th-large" aria-hidden="true"></i> Позиции</NavLink></li>
                <li><NavLink to="/contact"><i className="fa fa-phone-square" aria-hidden="true"></i> Контакт центр</NavLink></li>
            </ul> */}
            <ul className="Leftbar-small">
                <li><NavLink to="/home"><i style={{fontSize:19.6}} className="fa fa-home" aria-hidden="true"></i>Главная</NavLink></li>
                <li><NavLink to="/analytics"><i className="fa fa-bar-chart" aria-hidden="true"></i> CRM-аналитика</NavLink></li>
                <li><NavLink to="/order"><i className="fa fa-shopping-basket" aria-hidden="true"></i> Заказы</NavLink></li>
                <li><NavLink to="/category"><i className="fa fa-list-alt" aria-hidden="true"></i> Кактегории</NavLink></li>
                <li><NavLink to="/position"><i className="fa fa-th-large" aria-hidden="true"></i> Позиции</NavLink></li>
                <li><NavLink to="/contact"><i className="fa fa-phone-square" aria-hidden="true"></i> Контакт центр</NavLink></li>
            </ul>
        </div>
    )
}

export default Leftbar
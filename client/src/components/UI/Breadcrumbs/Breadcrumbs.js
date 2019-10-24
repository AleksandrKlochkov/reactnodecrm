import React from 'react'
import './Breadcrumbs.css'

import {NavLink} from 'react-router-dom'

const Breadcrumbs = props => {
    return(
        <div className="Breadcrumbs">
            <ul>
                <li><NavLink exact to="/" className="item">Главная</NavLink></li>
                <li><i className="fa fa-angle-right" aria-hidden="true"></i></li>
                {props.Breadcrumbs ? props.Breadcrumbs.map((item, index)=>{
                    return(
                        <React.Fragment key={index}>
                            <li><NavLink exact to={item.to} className="item">{item.title}</NavLink></li>
                            <li><i className="fa fa-angle-right" aria-hidden="true"></i></li>
                        </React.Fragment>
                    )
                })
            :
                null
            }
            </ul>
        </div>
    )
}

export default Breadcrumbs

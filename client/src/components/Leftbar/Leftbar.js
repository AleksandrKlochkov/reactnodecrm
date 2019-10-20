import React from 'react'
import './Leftbar.css'

import {NavLink} from 'react-router-dom'
import Search from '../UI/Search/Search'
import UserPanel from '../UserPanel/UserPanel'


const Leftbar = props => {
    const classes = ['Leftbar']

    if(props.type){
        classes.push('small')
    }

    const Links = [
        {
            to: '/home',
            title: 'Главная',
            icon: 'fa-home'
        },
        {
            to: '/analytics',
            title: 'CRM-аналитика',
            icon: 'fa-bar-chart'
        },
        {
            to: '/order',
            title: 'Заказы',
            icon: 'fa-shopping-basket'
        },
        {
            to: '/category',
            title: 'Кактегории',
            icon: 'fa-list-alt'
        },
        {
            to: '/position',
            title: 'Позиции',
            icon: 'fa-th-large'
        },
        {
            to: '/contact',
            title: 'Контакт-центер',
            icon: 'fa-phone-square'
        },

    ]

    const renderLinks = (links, type) => {
        const ul = type
        ? 
        (
            <ul className="Leftbar-small">
                {
                    links.map((item, index) => {
                            return (
                                <li key={index+1}>
                                    <NavLink to={item.to}><i className={`fa ${item.icon}`} aria-hidden="true"></i>
                                        <ul>
                                            <li>{item.title}</li>
                                        </ul>
                                    </NavLink> 
                                </li>
                            )
                    })
                }
            </ul>

        )
        :
        (
            <ul>
                {
                    links.map((item, index) => {
                        return (
                            <li key={index}><NavLink to={item.to}><i className={`fa ${item.icon}`} aria-hidden="true"></i>{item.title}</NavLink></li>
                        )
                    })
                }
            </ul>
        )            

        return ul
       
    }
    
    return (
        <div className={classes.join(' ')}>
            {props.type ? null : <div><UserPanel isLogout={props.isLogout} userPanel={props.userPanel} onClickToggleUserPanel={props.onClickToggleUserPanel}/> <Search /></div> }
            {renderLinks(Links, props.type)}
        </div>
    )
}

export default Leftbar
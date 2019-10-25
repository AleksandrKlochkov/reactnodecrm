import React from 'react'
import './UserPanel.css'

import {NavLink} from 'react-router-dom'


const UserPanel = props => {
    return(
        <div className="UserPanel" onClick={props.onClickToggleUserPanel}>
            <div>
                <div className="box-user">
                    <div className="box-image">
                        <img src="/uploads/avatar.jpg" className="img-circle" alt="User images"/>
                    </div>
                    <div className="box-info">
                        <p>Alexander Smit</p>
                        <p className="status"><i className="fa fa-circle online"></i> Online</p>
                    </div>
                </div>
                { props.userPanel 
                        ?
                            <ul>
                                <li><NavLink to="/profile"><i className="fa fa-user" aria-hidden="true"></i> Мой профиль</NavLink></li>
                                <li><NavLink to="/logout" onClick={props.isLogout}><i className="fa fa-sign-out" aria-hidden="true"></i> Выйти</NavLink></li>
                            </ul> 
                        :
                            null
                }
               <div className="toggle-btn">
                <i className={`fa ${props.userPanel ?'fa-angle-up' : 'fa-angle-down'}`} aria-hidden="true"></i>
               </div>
            </div>
        </div>
    )
}

export default UserPanel
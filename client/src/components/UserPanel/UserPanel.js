import React from 'react'
import './UserPanel.css'


const UserPanel = props => {
    return(
        <div className="UserPanel">
                <div className="box-image">
                    <img src="uploads/avatar.jpg" className="img-circle" alt="User Image" />
                </div>
                <div className="box-info">
                    <p>Alexander Pierce</p>
                    <a href="#"><i className="fa fa-circle online"></i> Online</a>
                </div>
        </div>
    )
}

export default UserPanel
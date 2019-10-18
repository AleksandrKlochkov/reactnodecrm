import React from 'react'
import './Leftbar.css'


const Leftbar = props => {
        return(
            <div className="Leftbar">
                <ul>
                    <li><a className="active" href="/">Главная <i class="fa fa-home" aria-hidden="true"></i></a></li>
                    <li><a href="#">CRM-аналитика <i class="fa fa-bar-chart" aria-hidden="true"></i></a></li>
                    <li><a href="#">Заказы <i class="fa fa-shopping-basket" aria-hidden="true"></i></a></li>
                    <li><a href="#">Кактегории <i class="fa fa-list-alt" aria-hidden="true"></i></a></li>
                    <li><a href="#">Позиции <i class="fa fa-th-large" aria-hidden="true"></i></a></li>
                    <li><a href="#">Контакт центр <i class="fa fa-phone-square" aria-hidden="true"></i></a></li>
                </ul>
            </div>
        )
}

export default Leftbar
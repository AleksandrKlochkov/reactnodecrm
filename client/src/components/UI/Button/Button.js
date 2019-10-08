import React from 'react'
import './Button.css'


const Button = props => {
        const buttonType = props.type || 'button'
        const cls = [props.className]

        return(
            <div className="Button">
                <button className={cls.join(' ')} type={buttonType}>{props.value}</button>
            </div>
        )
}

export default Button
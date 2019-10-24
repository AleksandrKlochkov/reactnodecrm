import React from 'react'
import './Button.css'


const Button = props => {
        const buttonType = props.type || 'button'
        const cls = [props.className]

        return(
            <div className="Button">
                <button className={cls.join(' ')} type={buttonType} value={props.value}>{props.children}</button>
            </div>
        )
}

export default Button
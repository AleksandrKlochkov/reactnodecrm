import React from 'react'
import './Input.css'


const Input = props => {
        const inputType = props.type || 'text'
        const inputPlaceholder= props.placeholder || ''
        const inputFor = props.id ? props.id : `${inputType}-${Math.random()}` 
        const errorMessage = props.errorMessage || 'Введите корректные данные'

        return(
            <div className="Input">
                <label htmlFor={inputFor}>{props.label}</label>
                <input
                    id={inputFor}
                    type={inputType}
                    placeholder={inputPlaceholder}
                />   
                {props.error ? <small className="error">{errorMessage}</small> : null}            
            </div>
        )
}

export default Input
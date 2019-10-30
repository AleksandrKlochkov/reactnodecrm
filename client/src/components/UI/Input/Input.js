import React from 'react'
import './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {
        const inputType = props.type || 'text'
        const inputPlaceholder= props.placeholder || ''
        const cls = ['Input']
        const inputFor = props.id ? props.id : `${inputType}-${Math.random()}`
        const errorMessage = props.errorMessage || 'Введите корректные данные'

        if(isInvalid(props)) {
            cls.push('invalid') 
        }

        return(
            <div className={cls.join(' ')}>
                <label htmlFor={inputFor.split('.').join('')}>{props.label}</label>
                <input
                    id={inputFor.split('.').join('')}
                    type={inputType}
                    name={props.name}
                    autoComplete={inputType}
                    value={props.value}
                    placeholder={inputPlaceholder}
                    onChange={props.onChange}
                />   
                {isInvalid(props) ? <small className="error">{errorMessage}</small> : null}            
            </div>
        )
}

export default Input
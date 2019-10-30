
import React from 'react'
import './ButtonFile.css'

import Button from '../Button/Button'

const ButtonFile = props => {

        const triggerClick = (event) =>{
            const elem = event.currentTarget
            elem.querySelector('input').click()
        }

        const buttonText = props.buttonText ? props.buttonText : 'Загрузить изображение'

        return(
            <div onClick={(event)=>triggerClick(event)} className="ButtonFile">
                <input onChange={props.onChangeHandler} type="file" hidden/>
                <Button className="orange"><i className="material-icons left">backup</i>{buttonText}</Button>
            </div>
        )
}

export default ButtonFile
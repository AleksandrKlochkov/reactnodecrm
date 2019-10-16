import React from 'react'
import './Alert.css'


const Alert = props => {

        const cls = ['Alert']

        switch(props.type){
            case 'success':
                cls.push('success')
                break
            case 'warning':
                cls.push('warning')
                break
            default:
                cls.push('danger')
                break
        }

        return(
            <div className={cls.join(' ')}>
                {props.message}
            </div>
        )
}

export default Alert
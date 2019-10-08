import React from 'react'
import './Form.css'


const Form = props => {
    const formName = props.formName ? (<span className="Form-title">{props.formName}</span>) : null
        return(
            <form
             className="Form"
             onSubmit={props.onSubmit}
             >
                {formName}
                <div>
                    {props.children}
                </div>
            </form>
        )
}

export default Form
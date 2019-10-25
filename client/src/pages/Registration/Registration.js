import React, {Component} from 'react'
import './Registration.css'
import Form from '../../components/Form/Form'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Alert from '../../components/UI/Alert/Alert'

import {validateControl, alertMessage} from '../../form/formValidation'
import {registration} from '../../store/actions/registration'
import {connect} from 'react-redux'


class Registration extends Component {

    state = {
        alertMessage: alertMessage('danger','Произошла непредвиденная ошибка',false),
        isFormValid: false,
        formControls: {
            email: {
              value: '',
              type: 'email',
              label: 'Email',
              placeholder: 'Введите Email',
              validOptions:{
                  valid: false,
                  errorMessage: 'Введите корректный Email'
              },
              touched: false,
              validation: {
                 required: true,
                 email: true   
              }         
            },
            name: {
                value: '',
                type: 'name',
                label: 'Имя',
                placeholder: 'Введите Имя',
                validOptions:{
                    valid: false,
                    errorMessage: 'Введите корректное имя'
                  },
                touched: false,
                validation: {
                   required: true,
                   minLength: 2  
                }         
              },
            password: {
              value: '',
              type: 'password',
              label: 'Пароль',
              placeholder: 'Введите пароль',
              validOptions:{
                valid: false,
                errorMessage: 'Введите корректный пароль'
              },
              touched: false,
              validation: {
                 required: true,
                 minLength: 6
              }         
            },
            password2: {
                value: '',
                type: 'password',
                label: 'Пароль еще раз',
                placeholder: 'Введите пароль повторно',
                validOptions:{
                    valid: false,
                    errorMessage: 'Введите пароль повторно'
                },
                touched: false,
                validation: {
                   required: true,
                   passwordReplay: true
                }         
              }

        }
    }

    onChangeHandler(event, controlName){
        const formControls = { ...this.state.formControls}
        const control = {...formControls[controlName]}
        control.value = event.target.value
        control.touched = true
        control.validOptions = validateControl(control.value, control.validation, formControls)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].validOptions.valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }


    onSubmitHandler = async (event) => {
        event.preventDefault()
        const controls = event.target.querySelectorAll('input')

        const formControls = {...this.state.formControls}

        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            const control = formControls[name]
            control.value = formControls[name].value
            control.touched = true
            control.validOptions = validateControl(control.value, control.validation, formControls)
            isFormValid = formControls[name].validOptions.valid && isFormValid
        })

        if(isFormValid){
           this.props.registration(formControls.email.value, formControls.password.value)
        }else{
            this.setState({
                formControls, isFormValid
            })
        }       
    }

    renderInputs(){
        return Object.keys(this.state.formControls).map((controlName, index)=> {
            const control = this.state.formControls[controlName]
            return(
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.validOptions.valid}
                    placeholder={control.placeholder}
                    name={controlName}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.validOptions.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)
                }
           />
            )
        })
    }
    render(){
        return(
            <div className="Registration">
                <div className="form-box">
                    <Form
                    formName={'Регистрация'}
                    onSubmit={(event)=>this.onSubmitHandler(event)}
                    >
                        {this.state.alertMessage.show ? <Alert type={this.state.alertMessage.type} message={this.state.alertMessage.message}/> : null}
                        {this.renderInputs()}
                        <Button className="success" type={'submit'} >Зарегистрироваться</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        registration: (email,password) => dispatch(registration(email,password))
    }
}

export default connect(null, mapDispatchToProps)(Registration)

import React, {Component} from 'react'
import './Registration.css'
import Form from '../../components/Form/Form'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Alert from '../../components/UI/Alert/Alert'

import {validateControl, alertMessage} from '../../form/formValidation'
import {Redirect} from 'react-router-dom'


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
           
            try{
                await fetch('/api/auth/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({email: formControls['email'].value,password: formControls['password'].value})
                    })
                    .then(response => {
                        return response.json()
                    })
                    .then(data=>{
                        if(data.message){
                            this.setState(
                                {
                                    alertMessage: alertMessage('danger',data.message),
                                }
                            )
                        }else{
                            //console.log('DataPOST', data)
                            Object.keys(controls).forEach(index => {
                                controls[index].value = ''
                            })
                            this.setState({
                                alertMessage: alertMessage('success','Вы успешно зарегистрировались!'),
                                formControls
                            })
                            window.setTimeout(()=>{
                                window.location.href='/'
                            }, 1500)
                            
                        }
                    })
                    .catch(e => {
                        this.setState({
                            alertMessage: alertMessage('danger',e),
                        })
                    })
            }catch(e){
                    this.setState({
                        alertMessage: alertMessage('danger',e),
                    })
            }
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
            <div>
                 <Form
                 formName={'Регистрация'}
                 onSubmit={(event)=>this.onSubmitHandler(event)}
                >
                    {this.state.alertMessage.show ? <Alert type={this.state.alertMessage.type} message={this.state.alertMessage.message}/> : null}
                    {this.renderInputs()}
                    <Button className="success" type={'submit'} >Зарегистрироваться</Button>
                </Form>
            </div>
        )
    }
}

export default Registration

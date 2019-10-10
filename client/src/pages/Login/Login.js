import React, {Component} from 'react'
import './Login.css'
import Form from '../../components/Form/Form'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {Link} from 'react-router-dom'
import {validateControl} from '../../form/formValidation'

class Login extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
              value: '',
              type: 'email',
              label: 'Email',
              errorMessage: 'Введите корректный email',
              placeholder:'Введите Email',
              valid: false,
              touched: false,
              validation: {
                 required: true,
                 email: true   
              }         
            },
            password: {
              value: '',
              type: 'password',
              label: 'Пароль',
              errorMessage: 'Введите корректный пароль',
              placeholder:'Введите пароль',
              valid: false,
              touched: false,
              validation: {
                 required: true,
                 minLength: 6 
              }         
            }
        }
    }

    onChangeHandler(event, controlName){
        const formControls = { ...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }

    onSubmitHandler = async (event) => {
        event.preventDefault()
        const formControls = {...this.state.formControls}
        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            const control = formControls[name]
            control.value = formControls[name].value
            control.touched = true
            control.valid = validateControl(control.value, control.validation)
            isFormValid = formControls[name].valid && isFormValid
        })

        if(isFormValid){
            fetch('/api/auth/login',{
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
                console.log('DataPOST', data)
            })
            .catch(e=>console.log(e))
        }else{
            this.setState({
                formControls, isFormValid
            })
        }
        console.log('Submit')
    }

    renderInputs(){
        return Object.keys(this.state.formControls).map((controlName, index)=> {
            const control = this.state.formControls[controlName]
            return(
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    placeholder={control.placeholder}
                    name={controlName}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)
                }
           />
            )
        })
    }

    render(){
        return(
            <div className="Login">
                <Form
                 formName={'Авторизация'}
                 onSubmit={(event)=>this.onSubmitHandler(event)}
                >
                    {this.renderInputs()}
                    <Button className="success" type={'submit'} >Войти</Button>
                    <Link to='/register'>
                        <Button className="primary" type={'submit'} value={'Регистрация'}>Регистрация</Button>
                    </Link>
                </Form>
            </div>
        )
    }
}

export default Login
import React, {Component} from 'react'
import './Registration.css'
import Form from '../../components/Form/Form'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {validateControl} from '../../form/formValidation'

class Registration extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
              value: '',
              type: 'email',
              label: 'Email',
              errorMessage: 'Введите корректный Email',
              placeholder: 'Введите Email',
              valid: false,
              touched: false,
              validation: {
                 required: true,
                 email: true   
              }         
            },
            // name: {
            //     value: '',
            //     type: 'name',
            //     label: 'Имя',
            //     errorMessage: 'Введите корректное имя',
            //     placeholder: 'Введите Имя',
            //     valid: false,
            //     touched: false,
            //     validation: {
            //        required: true,
            //        minLength: 2  
            //     }         
            //   },
            password: {
              value: '',
              type: 'password',
              label: 'Пароль',
              errorMessage: 'Введите корректный пароль',
              placeholder: 'Введите пароль',
              valid: false,
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
                errorMessage: 'Введите корректный пароль',
                placeholder: 'Введите пароль повторно',
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


    onSubmitHandler = (event) => {
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
            fetch('/api/auth/register',{
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
        console.log('Зарегистрироваться')
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
            <div>
                 <Form
                 formName={'Регистрация'}
                 onSubmit={(event)=>this.onSubmitHandler(event)}
                >
                    {this.renderInputs()}
                    <Button className="success" type={'submit'} >Зарегистрироваться</Button>
                </Form>
            </div>
        )
    }
}

export default Registration

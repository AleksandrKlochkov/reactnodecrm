import React, {Component} from 'react'
import './CategoryEditing.css'
import Form from '../../../components/Form/Form'
import Input from '../../../components/UI/Input/Input'
import {alertMessage, validateControl} from '../../../form/formValidation'
import Button from '../../../components/UI/Button/Button'


class CategoryEditing extends Component {

    state = {
        alertMessage: alertMessage('danger','Произошла непредвиденная ошибка',false),
        isFormValid: false,
        formControls: {
            name: {
                value: '',
                type: 'name',
                label: 'Название категории',
                placeholder: 'Введите название',
                validOptions:{
                    valid: false,
                    errorMessage: 'Введите корректное название'
                  },
                touched: false,
                validation: {
                   required: true,
                   minLength: 2  
                }         
              },

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
        return (
            <div className="CategoryEditing">
                <div className="form-box">
                    <Form formName='Добавить категорию'>
                        {this.renderInputs()}
                        <Button className="success">Сохранить</Button>
                    </Form>
                </div>
                <div className="img-box">
                    sda
                </div>
                
            </div>
        )
    }
}

export default CategoryEditing
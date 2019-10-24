import React, {Component} from 'react'
import './CategoryEditing.css'
import Form from '../../components/Form/Form'
import Input from '../../components/UI/Input/Input'
import {alertMessage, validateControl} from '../../form/formValidation'
import Button from '../../components/UI/Button/Button'
import ButtonFile from '../../components/UI/ButtonFile/ButtonFile'
import Alert from '../../components/UI/Alert/Alert.js'

class CategoryEditing extends Component {

    state = {
        alertMessage: alertMessage('danger','Произошла непредвиденная ошибка',false),
        isFormValid: false,
        formControls: {
            titleCategory: {
                value: '',
                type: 'text',
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
              }
        },
        imageCtegory: '/uploads/no_image.jpg'
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

    uploadsFiles = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()
       
    
            reader.onload = () => {
            this.setState({
                imageCtegory: reader.result
            })
        }
    
        reader.readAsDataURL(file)
        
    }

    onSubmitEditingCategory = async (event) => {
        event.preventDefault()
        const controls = event.target.querySelectorAll('input')
        const inputFile = event.target.querySelector('input[type=file]')
        let file = {}
        if(inputFile.files[0]){
            file = inputFile.files[0]
        }
        console.log(file)

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
                await fetch('/api/category/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({name: formControls['titleCategory'].value,file: file})
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
                            Object.keys(controls).forEach(index => {
                                controls[index].value = ''
                            })
                            this.setState({
                                alertMessage: alertMessage('success','Категория успешно создана!'),
                                formControls
                            })
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
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render(){
        return (
            <div className="CategoryEditing">
                 {this.state.alertMessage.show ? <Alert type={this.state.alertMessage.type} message={this.state.alertMessage.message}/> : null}
                <div>
                    <Form onSubmit={(event)=>this.onSubmitEditingCategory(event)} formName='Добавить категорию'>
                        {this.renderInputs()}
                        <div className="button-box">
                            <Button type="submit" className="success">Сохранить</Button>
                            <ButtonFile onChangeHandler={this.uploadsFiles}/>
                        </div>
                    </Form>
                </div>
                <div className="img-box">
                   <img src={`${this.state.imageCtegory}`} alt="asd"/> {/* http://localhost:5000/uploads/ */}
                </div>
            </div>
        )
    }
}

export default CategoryEditing
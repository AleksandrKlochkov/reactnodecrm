import React, {Component} from 'react'
import './CategoryEditing.css'
import Form from '../../components/Form/Form'
import Input from '../../components/UI/Input/Input'
import {alertMessage, validateControl} from '../../form/formValidation'
import Button from '../../components/UI/Button/Button'
import ButtonFile from '../../components/UI/ButtonFile/ButtonFile'

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
        imageControl: {
            default: '/uploads/no_image.jpg',
            imageSrc: '/uploads/no_image.jpg',
            imageUpload: ''
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

    uploadsFiles = (event) => {
        const file = event.target.files[0]
        const imageControl = this.state.imageControl
        imageControl.imageUpload = file
        this.setState({
            imageControl
        })
        
        const reader = new FileReader()
        reader.onload = () => {
            imageControl.imageSrc = reader.result
            this.setState({
                imageControl
            })
        }
        reader.readAsDataURL(file)
    }

    onSubmitEditingCategory = async (event) => {
        event.preventDefault()
        const controls = event.target.querySelectorAll('input')
        const imageControl = this.state.imageControl
        const image = imageControl.imageUpload
        const formControls = {...this.state.formControls}

        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            const control = formControls[name]
            control.value = formControls[name].value
            control.touched = true
            control.validOptions = validateControl(control.value, control.validation, formControls)
            isFormValid = formControls[name].validOptions.valid && isFormValid
        })

        const data = new FormData()
        if(image){
            data.append('image', image, image.name)
        }
        data.append('name', formControls['titleCategory'].value)

        if(isFormValid){
            try{
                await fetch('/api/category', {
                    method: 'POST',
                    headers: {
                                'Accept': 'application/json'
                            },
                    body: data
                  })
                    .then(response => {
                        return response.json()
                    })
                    .then(data=>{
                        Object.keys(controls).map(key=>{
                            const control = controls[key]
                            return control.value=''
                        })
                        formControls['titleCategory'].value=''
                        imageControl.imageSrc=this.state.imageControl.default
                        imageControl.imageUpload=''
                        this.setState({
                            imageControl,
                            formControls
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

    async componentDidMount(){
        const id = this.props.match.params.id
        if(id){
            
        }
    }

    render(){
        console.log(this.props.match.params.id)
        return (
            <div className="CategoryEditing">
               
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
                   <img src={`${this.state.imageControl.imageSrc}`} alt="asd"/>
                </div>
            </div>
        )
    }
}

export default CategoryEditing
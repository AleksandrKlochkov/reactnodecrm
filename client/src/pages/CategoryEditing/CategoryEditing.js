import React, {Component} from 'react'
import './CategoryEditing.css'
import {withRouter} from 'react-router-dom'
import Form from '../../components/Form/Form'
import Input from '../../components/UI/Input/Input'
import {validateControl} from '../../form/formValidation'
import Button from '../../components/UI/Button/Button'
import ButtonFile from '../../components/UI/ButtonFile/ButtonFile'

import {connect} from 'react-redux'
import {addCategory, editingCategory, fetchCategoryById} from '../../store/actions/category'
import Loading from '../../components/Loading/Loading'



class CategoryEditing extends Component {

    state = {
        isNew: true,
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
            defaultImageSrc: 'uploads/no_image.jpg',
            imageSrc: '',
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

    onSubmitEditingCategory = (event) => {
        event.preventDefault()
        const categoryId = this.props.match.params.id
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
            if(this.state.isNew) {
                    this.props.addCategory(data)
                    this.functionControlsClear(formControls, imageControl)
                }else{
                    this.props.editingCategory(categoryId, data)
                }
        }else{
            this.setState({
                formControls, isFormValid
            })
        }       
        
    }

    functionControlsClear(formControls, imageControl){
        formControls['titleCategory'].value=''
        imageControl.defaultImageSrc=this.state.imageControl.defaultImageSrc
        imageControl.imageUpload=''
        imageControl.imageSrc=''
        this.setState({
            imageControl,
            formControls
        })
    }

    renderInputs(){
        let nameCategory = ''
        return Object.keys(this.state.formControls).map((controlName, index)=> {
            const control = this.state.formControls[controlName]
            // if(!this.state.isNew){
            //     nameCategory = this.props.category.name
            //     control.titleCategory.value = nameCategory || control.titleCategory.value
            // }
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

    renderCategoruEditing(){
        let uploadImageSrc = '/'+this.state.imageControl.defaultImageSrc
        if(!this.state.isNew){
            console.log('this.state.imageControl.imageSrc', this.state.imageControl.imageSrc)
            console.log('this.props.category.imageSrc', this.props.category.imageSrc)
            uploadImageSrc = this.state.imageControl.imageSrc ? this.state.imageControl.imageSrc : '/'+this.props.category.imageSrc
        }else{
            uploadImageSrc = this.state.imageControl.imageSrc ? this.state.imageControl.imageSrc : '/'+this.state.imageControl.defaultImageSrc
        }

        return(
            <div className="CategoryEditing">
                <div>
                    <Form onSubmit={(event)=>this.onSubmitEditingCategory(event)} formName={this.state.isNew ? 'Добавить категорию' : 'Редактировать категорию'}>
                        {this.renderInputs()}
                        <div className="button-box">
                            <Button type="submit" className="success">Сохранить</Button>
                            <ButtonFile onChangeHandler={this.uploadsFiles} buttonText={this.state.isNew ? 'Загрузить изображение' : 'Изменить изображение'}/>
                        </div>
                    </Form>
                </div>
                <div className="img-box">
                     <img src={`${uploadImageSrc ? uploadImageSrc : '/'+this.state.imageControl.defaultImageSrc}`} alt="Category"/>
                </div>
            </div>
        )
    }

     async componentDidMount(){
        const id = this.props.match.params.id
        const formControls = {...this.state.formControls}
        const imageControl = this.state.imageControl

            if(id){
                this.props.fetchCategoryById(id)
                try{
                    await fetch(`/api/category/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    })
                    .then(response => {
                        return response.json()
                    })
                    .then(data=>{
                        const category = data
                       
                        formControls.titleCategory.value = category.name
                        imageControl.imageSrc = '/'+category.imageSrc
                        this.setState({
                            isNew: false,
                            formControls,
                            imageControl
                        })
                    })
                }catch(e){
                    console.log(e)
                }

            }else{
                this.setState({
                    isNew: true
                })
            }
    }

    componentWillUnmount(){
        const imageControl = this.state.imageControl
        const formControls = {...this.state.formControls}
        this.functionControlsClear(formControls, imageControl)
    }

    render(){
        return (
            <React.Fragment>
               {this.props.loading ? <Loading /> : this.renderCategoruEditing()}
            </React.Fragment>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return{
        category: state.category.category,
        loading: state.category.loading
    }
}

function mapDispatchToProps(dispatch){
    return{
        addCategory: (data)=>dispatch(addCategory(data)),
        fetchCategoryById: (id)=>dispatch(fetchCategoryById(id)),
        editingCategory: (id, data) =>dispatch(editingCategory(id, data))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CategoryEditing))
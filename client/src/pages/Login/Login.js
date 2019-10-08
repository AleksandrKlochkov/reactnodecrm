import React, {Component} from 'react'
import './Login.css'
import Form from '../../components/Form/Form'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {Link} from 'react-router-dom'


class Login extends Component {

    onSubmitHandler = (event) => {
        event.preventDefault()
        console.log('Submit')
    }

    render(){
        return(
            <div className="Login">
                <Form
                 formName={'Авторизация'}
                 onSubmit={(event)=>this.onSubmitHandler(event)}
                >
                    <Input label={'Email'} placeholder="Введите Email"/>
                    <Input label={'Пароль'} type={'password'} placeholder="Введите пароль"/>
                    <Button className="success" type={'submit'} value={'Войти'}/>
                    <Link to='/register'>
                        <Button className="primary" type={'submit'} value={'Регистрация'}/>
                    </Link>
                </Form>
            </div>
        )
    }
}

export default Login
import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes'
import {alertMessage} from '../actions/alertMessage'


export function auth(email, password, isLogin){
    return async dispatch => {
        const authData = {
            email: email,
            password: password
        }

        const url = '/api/auth/login'

        try{
            if(url){
                await fetch(url,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(authData)
                })
                .then(response => {
                    return response.json()
                })
                .then(data=>{
                    if(data.message){
                        dispatch(alertMessage('danger',data.message, true))
                    }else{
                        if(data.token){
                            const experationDate = new Date(data.expiresIn*1000)
                            localStorage.setItem('token', data.token)
                            localStorage.setItem('experationDate', experationDate)
                            dispatch(authSuccess(data.token))
                            dispatch(authLogout(data.expiresIn))
                        }else{
                           dispatch(alertMessage('danger','Авторизоваться не удалось. Попробуйте снова или повторите позже.', true))
                        }
                    }
                })
                .catch(e => {
                    dispatch(alertMessage('danger', e, true))
                })
            }
        }catch(e){
            dispatch(alertMessage('danger', e, true))
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function authLogout(time) {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout())   
        }, time*1000)
    }
}

export function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('experationDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token) {
            dispatch(logout())
        }else{
            const experationDate = new Date(localStorage.getItem('experationDate'))
            if(experationDate<=new Date()){
               dispatch(logout())
            }else{
                dispatch(authSuccess(token))
                dispatch(authLogout((experationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}
import {alertMessage} from '../actions/alertMessage'
import {REDIRECT, REGISTRATION_SUCCESS} from '../actions/actionTypes'

export function registration(email,password){
    return async dispatch => {
        try{
            await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({email,password})
                })
                .then(response => {
                    return response.json()
                })
                .then(data=>{
                    if(data.message){
                        dispatch(alertMessage('danger', data.message, true))
                    }else{
                        dispatch(alertMessage('success', 'Пользователь успешно зарегистрирован!', true))
                        dispatch(registrationSuccess())
                        dispatch({type: REDIRECT, payload: {method: 'push', nextUrl: '/'}})
                        window.location.href='/'
                    }
                })
                .catch(e => {
                    dispatch(alertMessage('danger',e, true))
                })
        }catch(e){
            dispatch(alertMessage('danger',e, true))
        }
    }
}

export function registrationSuccess(){
    return {
       type: REGISTRATION_SUCCESS
    }
}


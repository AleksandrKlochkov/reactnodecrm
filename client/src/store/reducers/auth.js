import {alertMessage} from '../../form/formValidation'
import {AUTH_SUCCESS, ALERT_MESSAGE, AUTH_LOGOUT} from '../actions/actionTypes'
const initialState = {
    token: null,
    alertMessage: alertMessage('danger','Произошла непредвиденная ошибка',false)
}

export default function authReducer(state=initialState, action){
    switch (action.type){
        case AUTH_SUCCESS:
            return{
                ...state, token: action.token
            }
        case ALERT_MESSAGE:
                return{
                    ...state, alertMessage: action.alertMessage
                }
        case AUTH_LOGOUT:
            return{
                ...state, token: null
            }

                
        default:
            return state
    }
}
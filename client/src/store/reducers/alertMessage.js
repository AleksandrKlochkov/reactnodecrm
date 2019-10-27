import { ALERT_MESSAGE } from "../actions/actionTypes"

const initialState = {
    alertMessage: {
        show: false,
        type: 'warning',
        message: 'Произошла непредвиденная ошибка'
    }
}

export default function alertMessageReducer(state=initialState, action){
    switch (action.type){
        case ALERT_MESSAGE :
            return{
                ...state, alertMessage: action.message
            }    
        default:
            return state
    }
}
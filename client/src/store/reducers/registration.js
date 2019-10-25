import {alertMessage} from '../../form/formValidation'
const initialState = {
    token: null,
    alertMessage: alertMessage('danger','Произошла непредвиденная ошибка',false)
}

export default function registrationReducer(state=initialState, action){
    switch (action.type){
        // case REGISTRATION_SUCCESS:
        //     return{
        //         ...state, token: action.token
        //     }
        // case REGISTRATION_MESSAGE:
        //         return{
        //             ...state, alertMessage: action.alertMessage
        //         }
        default:
            return state
    }
}
import {REGISTRATION_SUCCESS} from '../actions/actionTypes'
const initialState = {
    registration: true 
}

export default function registrationReducer(state=initialState, action){
    switch (action.type){
        case REGISTRATION_SUCCESS:
            return{
                ...state
            }

        default:
            return state
    }
}
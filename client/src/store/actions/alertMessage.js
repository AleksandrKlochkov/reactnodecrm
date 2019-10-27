import { ALERT_MESSAGE } from "./actionTypes"

export function alertMessage(type,text, show){
    return dispatch => { 
        const message = {
            type, text, show,
        }
       dispatch(alertShowMessage(message))
    }

}

export function alertShowMessage(message) {
    return {
        type: ALERT_MESSAGE, message
    }
}
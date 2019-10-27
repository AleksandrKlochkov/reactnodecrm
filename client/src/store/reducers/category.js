import { ALERT_MESSAGE, CATEGORY_LIST } from "../actions/actionTypes"

const initialState = {
    сategories: []
}

export default function categoryReducer(state=initialState, action){
    switch (action.type){
        case CATEGORY_LIST :
            return{
                ...state, categories: action.list
            }    
        default:
            return state
    }
}
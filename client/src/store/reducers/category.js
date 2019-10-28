import {FETCH_CATEGORY_START, FETCH_CATEGORY_SUCCESS } from "../actions/actionTypes"

const initialState = {
    сategories: [],
    loading: false
}

export default function categoryReducer(state=initialState, action){
    switch (action.type){
        case FETCH_CATEGORY_START :
            return{
                ...state, loading: true
            }  
        case FETCH_CATEGORY_SUCCESS :
            return{
                ...state, loading: false, сategories: action.сategories
            } 
        default:
            return state
    }
}
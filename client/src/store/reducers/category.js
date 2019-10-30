import {FETCH_CATEGORY_START, FETCH_CATEGORY_SUCCESS, ADD_CATEGORY_SUCCESS, FETCH_CATEGORY_BY_ID_SUCCESS, FETCH_CATEGORY_BY_ID_START, FETCH_CATEGORY_BY_ID_END, EDITING_CATEGORY_SUCCESS} from "../actions/actionTypes"

const initialState = {
    categories: [],
    category: {},
    loading: false,
}

export default function categoryReducer(state=initialState, action){
    switch (action.type){
        case FETCH_CATEGORY_START :
            return{
                ...state, loading: true
            }  
        case FETCH_CATEGORY_SUCCESS :
            return{
                ...state, categories: action.categories, loading: false
            } 
        case FETCH_CATEGORY_BY_ID_START:
                return{
                    ...state, loading: true
                }
        case FETCH_CATEGORY_BY_ID_SUCCESS:
            return{
                ...state, category: action.category , loading: false
            }
        case FETCH_CATEGORY_BY_ID_END :
                return{
                    ...state, loading: false
                } 
        case ADD_CATEGORY_SUCCESS:
        
            const categories = state.categories
            categories.push(action.category)
            return{
                ...state, categories
            }
        
        case EDITING_CATEGORY_SUCCESS:
        {
            const categories = state.categories
            const category = categories.findIndex(category => category._id === action.categoryId)
            categories[category].name = action.category.name
            categories[category].imageSrc = action.category.imageSrc
            return{
                ...state, categories
            }
        }
        default:
            return state
    }
}
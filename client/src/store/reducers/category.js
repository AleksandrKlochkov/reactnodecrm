import {FETCH_CATEGORY_START, FETCH_CATEGORY_SUCCESS, ADD_CATEGORY_SUCCESS, FETCH_CATEGORY_BY_ID_SUCCESS, FETCH_CATEGORY_BY_ID_START, FETCH_CATEGORY_BY_ID_END} from "../actions/actionTypes"

const initialState = {
    сategories: [],
    category: {},
    loading: false,
    // formControls: {
    //     titleCategory: {
    //         value: '',
    //         type: 'text',
    //         label: 'Название категории',
    //         placeholder: 'Введите название',
    //         validOptions:{
    //             valid: false,
    //             errorMessage: 'Введите корректное название'
    //           },
    //         touched: false,
    //         validation: {
    //            required: true,
    //            minLength: 2  
    //         }         
    //       }
    // },
    // imageControl: {
    //     imageSrc: '',
    //     imageUpload: ''
    // }
}

export default function categoryReducer(state=initialState, action){
    switch (action.type){
        case FETCH_CATEGORY_START :
            return{
                ...state, loading: true
            }  
        case FETCH_CATEGORY_SUCCESS :
            return{
                ...state, сategories: action.сategories, loading: false
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
            return{
                ...state, imageControl: { default: '/uploads/no_image.jpg', imageSrc: '/uploads/no_image.jpg', imageUpload: ''}
            }
        default:
            return state
    }
}
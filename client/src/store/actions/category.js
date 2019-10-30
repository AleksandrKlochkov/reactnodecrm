import {FETCH_CATEGORY_START, FETCH_CATEGORY_SUCCESS, ADD_CATEGORY_SUCCESS, FETCH_CATEGORY_BY_ID_SUCCESS, FETCH_CATEGORY_BY_ID_START, FETCH_CATEGORY_BY_ID_END} from "./actionTypes"
import {alertMessage} from './alertMessage'

export function fetchCategory(){
    return async dispatch => { 
        dispatch(fetchCategoryStart())
        try{
            const categories = []
            await fetch('/api/category', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                return response.json()
            })
            .then(data=>{
                if(data){
                    Object.keys(data).map((key) => {
                        const item = data[key]
                        categories.push(item)
                        return ''
                    })
                    dispatch(fetchCategorySuccess(categories))
                }else{
                    dispatch(alertMessage('danger','Не удалось получить список категорий', true))
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

export function fetchCategoryStart(){
    return{
        type: FETCH_CATEGORY_START
    }
}

export function fetchCategorySuccess(сategories){
    return{
        type: FETCH_CATEGORY_SUCCESS, сategories
    }
}

export function addCategory(data){
    return async dispatch => { 
        try{
            await fetch('/api/category', {
                method: 'POST',
                headers: {
                            'Accept': 'application/json'
                        },
                body: data
              })
                .then(response => {
                    return response.json()
                })
                .then(data=>{
                    dispatch(addCategorySuccess(data))
                })
        }catch(e){
                dispatch(alertMessage('danger',e,true))
        }
    }
}

export function addCategorySuccess(data){
    return{
        type: ADD_CATEGORY_SUCCESS
    }
}

export function fetchCategoryById(id){
    return async dispatch => { 
        dispatch(fetchCategoryByIdStart())
        try{
            await fetch(`/api/category/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                return response.json()
            })
            .then(data=>{
                const category = data
                dispatch(fetchCategoryByIdSuccess(category))
                //dispatch(fetchCategoryByIdEnd())
            })
            .catch(e => {
                dispatch(alertMessage('danger',e, true))
            })
        }catch(e){
            dispatch(alertMessage('danger',e, true))
        }
      
    }
}

export function fetchCategoryByIdStart(){
   return{
        type: FETCH_CATEGORY_BY_ID_START
   }
}

export function fetchCategoryByIdSuccess(category){
    return{
        type: FETCH_CATEGORY_BY_ID_SUCCESS, category
    }
}

export function fetchCategoryByIdEnd(){
    return{
        type: FETCH_CATEGORY_BY_ID_END
    }
}

import {FETCH_CATEGORY_START, FETCH_CATEGORY_SUCCESS} from "./actionTypes"
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

export function addNewCategory(){
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
                console.log(data)
            })
            .catch(e => {
                dispatch(alertMessage('danger',e, true))
            })
        }catch(e){
            dispatch(alertMessage('danger',e, true))
        }
    }
}

export function fetchCategoryById(id){
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
                console.log(data)
            })
            .catch(e => {
                dispatch(alertMessage('danger',e, true))
            })
        }catch(e){
            dispatch(alertMessage('danger',e, true))
        }
    }
}

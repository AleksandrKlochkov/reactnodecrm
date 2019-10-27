import {CATEGORY_LIST } from "./actionTypes"
import {alertMessage} from './alertMessage'

export function category(){
    return async dispatch => { 
        try{
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
                    dispatch(categoryList(data))
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

export function categoryList(list){
    console.log('categoryList', list)
    return{
        type: CATEGORY_LIST, list
    }
}

import {combineReducers} from 'redux'
import authReducer from './auth'
import registrationReducer from './registration'
import alertMessageReducer from './alertMessage'
import categoryReducer from './category'

export default combineReducers({
    auth: authReducer,
    registration: registrationReducer,
    alertMessage: alertMessageReducer,
    category: categoryReducer
})
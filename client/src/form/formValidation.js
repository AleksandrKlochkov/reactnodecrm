import is from 'is_js'

export function validateControl(value, validation, controls) {
    if(!validation) {
        return true
    }

    let isValid = true
    let errorMessage = 'Введите корректные данные'

    if(validation.required) {
        isValid = value.trim() !== '' && isValid
        errorMessage = 'Поле не должно быть пустым'
        if(!isValid){
         return {valid: isValid, errorMessage}
        }
    }

    if(validation.email) {
        isValid = is.email(value) && isValid
        errorMessage = 'Введите корректный Email'
        if(!isValid){
            return {valid: isValid, errorMessage}
           }
    }

    if(validation.minLength) {
       isValid = value.length >= validation.minLength && isValid
       errorMessage = `Минимальное значение ${validation.minLength} символов`
       if(!isValid){
        return {valid: isValid, errorMessage}
       }
    }

     if(validation.passwordReplay) {
        isValid = value === controls.password.value
        errorMessage = 'Пароли не совпадают'
        if(!isValid){
            return {valid: isValid, errorMessage}
           }
     }

    return {valid: isValid, errorMessage}
}


export function alertMessage(type,message, show=true){
    const alertMessages = {
        show: show,
        type: type || 'danger',
        message: message || 'Произошла непредвиденная ошибка'
    }
    return alertMessages
}
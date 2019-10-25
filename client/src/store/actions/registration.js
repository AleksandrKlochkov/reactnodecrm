export function registration(email,password){
    return async dispatch => {
        try{
            await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({email,password})
                })
                .then(response => {
                    return response.json()
                })
                .then(data=>{
                    if(data.message){
                        console.log(data.message)
                        // this.setState(
                        //     {
                        //         alertMessage: alertMessage('danger',data.message),
                        //     }
                        // )
                    }else{
                        console.log(data)
                        // Object.keys(controls).forEach(index => {
                        //     controls[index].value = ''
                        // })
                        // this.setState({
                        //     alertMessage: alertMessage('success','Вы успешно зарегистрировались!'),
                        //     formControls
                        // })
                        // window.setTimeout(()=>{
                        //     window.location.href='/'
                        // }, 1500)
                        
                    }
                })
                .catch(e => {
                    // this.setState({
                    //     alertMessage: alertMessage('danger',e),
                    // })
                })
        }catch(e){
                // this.setState({
                //     alertMessage: alertMessage('danger',e),
                // })
        }
    }
}


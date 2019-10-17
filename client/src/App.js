import React, {Component} from 'react'
import AuthLayout from './hoc/Layout/AuthLayout/AuthLayout'
import SiteLayout from './hoc/Layout/SiteLayout/SiteLayout'
// import {Switch, Route, Redirect} from 'react-router-dom'

class App extends Component {


 render(){
   const isAuthenticated = localStorage.getItem('token') ? true : false
    let layout = (
      isAuthenticated ? <SiteLayout /> : <AuthLayout /> 
    )
    return (
      layout
    )
 }
}

export default App;

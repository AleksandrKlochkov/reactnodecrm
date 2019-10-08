import React, {Component} from 'react'
import AuthLayout from './hoc/Layout/AuthLayout/AuthLayout'
import SiteLayout from './hoc/Layout/SiteLayout/SiteLayout'
// import {Switch, Route, Redirect} from 'react-router-dom'

class App extends Component {
 state = {
    isAuthenticated: false
 }

 render(){
    let layout = (
      this.state.isAuthenticated ? <SiteLayout /> : <AuthLayout /> 
    )
    return (
      layout
    )
 }
}

export default App;

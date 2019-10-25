import React, {Component} from 'react'
import AuthLayout from './hoc/Layout/AuthLayout/AuthLayout'
import SiteLayout from './hoc/Layout/SiteLayout/SiteLayout'
import {connect} from 'react-redux'
import {autoLogin} from './store/actions/auth'
// import {Switch, Route, Redirect} from 'react-router-dom'

class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

 render(){
    const layout = this.props.isAuthenticated ? <SiteLayout /> : <AuthLayout /> 
    return (
      layout
    )
 }
}


function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

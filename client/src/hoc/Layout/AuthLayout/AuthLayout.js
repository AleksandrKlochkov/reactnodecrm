import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Login from '../../../pages/Login/Login'
import Registration from '../../../pages/Registration/Registration'
import Navbar from '../../../components/Navbar/Navbar'

class AuthLayout extends Component {
    state = {
        navLink: [
            {
                to: '/login',
                title: 'Войти'
            },
            {
                to: '/register',
                title: 'Регистарция'
            }
        ]
    }

    render(){
        return(
            <div className="wrapper">
                <Navbar navLink={this.state.navLink} />
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/login" />
                        </Route>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Registration} />
                        <Redirect to="/" />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default AuthLayout

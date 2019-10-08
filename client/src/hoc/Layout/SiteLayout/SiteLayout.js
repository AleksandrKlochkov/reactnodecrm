import React, {Component} from 'react'
import './SiteLayout.css'
import {Route, Switch, Redirect} from 'react-router-dom'

import Home from '../../../pages/Home/Home'

class SiteLayout extends Component {
    render(){
        return(
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route path="/home" component={Home} />
            </Switch>
        )
    }
}

export default SiteLayout

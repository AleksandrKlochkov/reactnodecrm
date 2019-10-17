import React, {Component} from 'react'
import './SiteLayout.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import Footer from '../../../components/Footer/Footer'

import Home from '../../../pages/Home/Home'

class SiteLayout extends Component {
    render(){
        return(
           
    <div className="wrapper">
        <div className="content">
            <div className="container">
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route path="/home" component={Home} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </div>

    <Footer />
    </div>
        )
    }
}

export default SiteLayout

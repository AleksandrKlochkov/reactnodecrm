import React, {Component} from 'react'
import './SiteLayout.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import Footer from '../../../components/Footer/Footer'
import Leftbar from '../../../components/Leftbar/Leftbar'

import Home from '../../../pages/Home/Home'
import Navbar from '../../../components/Navbar/Navbar'

class SiteLayout extends Component {
    render(){
        return(      
        <div className="wrapper">
            <Navbar />
            <div className="content">
                    <div className="SiteLayout-wrapper">
                        <div className="SiteLayout-left-bar">
                            <Leftbar />
                        </div>
                        <div className="SiteLayout-content">
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/home" />
                            </Route>
                            <Route path="/home" component={Home} />
                            <Redirect to="/" />
                        </Switch>
                        </div>
                    </div>
            </div>
            <Footer />
        </div>
        )
    }
}

export default SiteLayout

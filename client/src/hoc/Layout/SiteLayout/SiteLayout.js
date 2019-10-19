import React, {Component} from 'react'
import './SiteLayout.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import Footer from '../../../components/Footer/Footer'
import Leftbar from '../../../components/Leftbar/Leftbar'

import Home from '../../../pages/Home/Home'
import Navbar from '../../../components/Navbar/Navbar'
import Analytics from '../../../pages/Analytics/Analytics'
import Order from '../../../pages/Order/Order'
import Category from '../../../pages/Category/Category'
import Position from '../../../pages/Position/Position'
import ContactCenter from '../../../pages/ContactCenter/ContactCenter'

class SiteLayout extends Component {

    onClickToggleMenu=(event)=>{
        console.log(event)
    }

    render(){
        return(      
        <div className="wrapper">
            <Navbar toggleMenu={true} leftBarToggle={(event)=>this.onClickToggleMenu(event)}/>
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
                            <Route path="/analytics" component={Analytics}/>
                            <Route path="/order" component={Order}/>
                            <Route path="/category" component={Category}/>
                            <Route path="/position" component={Position}/>
                            <Route path="/contact" component={ContactCenter}/>
                            <Redirect exact to="/" />
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

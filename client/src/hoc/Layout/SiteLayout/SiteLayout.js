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
import MyProfile from '../../../pages/MyProfile/MyProfile'
import Logout from '../../../components/Logout/Logout'

class SiteLayout extends Component {

    state = {
        leftBar: {
            small: false
        },
        userPanel: false,
        navLink: [
            {
                to: '/profile',
                title: '',
                icon: 'fa-user'
            },
            {
                to: '/logout',
                title: 'Выйти',
                icon: 'fa-sign-out'
            }
            
        ]
    }

    onClickToggleMenu = () => {
        const leftBar = this.state.leftBar
        leftBar.small = !leftBar.small
        this.setState({
            leftBar
        })
    }

    onClickToggleUserPanel = () => {
       const userPanel = this.state.userPanel
       this.setState({
         userPanel: !userPanel
       })
    }

    isLogout = () =>{
        localStorage.removeItem('token')
    }

    render(){
        return(      
        <div className="wrapper">
            <Navbar navLink={this.state.navLink} toggleMenu={true} leftBarToggle={this.onClickToggleMenu}/>
            <div className="content">
                    <div className="SiteLayout-wrapper">
                        <div className={`SiteLayout-left-bar ${this.state.leftBar.small ? 'small' : ''}`}>
                            <Leftbar
                             onClickToggleUserPanel={this.onClickToggleUserPanel}
                             userPanel={this.state.userPanel}
                             type={this.state.leftBar.small}
                             isLogout={this.isLogout}
                            />
                        </div>
                        <div className="SiteLayout-content">
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to="/home" />
                                </Route>
                                <Route path="/home" component={Home}/>
                                <Route path="/profile" component={MyProfile}/>
                                <Route path="/analytics" component={Analytics}/>
                                <Route path="/order" component={Order}/>
                                <Route path="/category" component={Category}/>
                                <Route path="/position" component={Position}/>
                                <Route path="/contact" component={ContactCenter}/>
                                <Route path="/logout" component={Logout}/>
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

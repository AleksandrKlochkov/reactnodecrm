import React, {Component} from 'react'
import './Category.css'
import {NavLink, Link, Route, Switch} from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import Alert from '../../components/UI/Alert/Alert'
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs'
import CategoryEditing from '../CategoryEditing/CategoryEditing'
import Loading from '../../components/Loading/Loading'
import {connect} from 'react-redux'
import {category} from '../../store/actions/category'


class Category extends Component {




    renderCategoriesList(){
        const categoriesList = this.props.сategories
        if(categoriesList){
            return (
                <ul className="Category-list">
                    {
                        categoriesList.map((item, index)=>{
                            return (
                                <li key={index}><NavLink to={item.to}>{item.title}</NavLink></li>
                            )
                        })
                    }
             </ul>
            )
        }

        return 'У Вас пока нет доступных категорий'
    }

    componentDidMount(){
        this.props.category()
    }

    render(){
        console.log(this.props)
        const {location, match} = this.props
        return(
            <div className="Category">
                <Breadcrumbs />
                <div className="page-title">
                    <h1> Категории</h1>
                    {location.pathname === match.url ?
                        <Link to={`/category/editing`}>
                            <Button className={'navyblue'}>Добавить категорию</Button>
                        </Link>
                    : null
                    }
                </div>
                <div className="Category-box">
                    <Loading />
                {this.props.alertMessage.show ? <Alert type={this.props.alertMessage.type} message={this.props.alertMessage.message}/> : null}
                   <Switch>
                    <Route exact path={'/category'}>
                        {this.renderCategoriesList()}
                    </Route>
                    <Route path={'/category/editing'} component={CategoryEditing} />
                </Switch>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return{
        сategories: state.category.сategories,
        alertMessage: state.alertMessage.alertMessage
    }
}

function mapDispatchToProps(dispatch){
    return{
        category: () => dispatch(category())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
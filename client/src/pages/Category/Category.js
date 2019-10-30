import React, {Component} from 'react'
import './Category.css'
import {NavLink, Link, Route, Switch} from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import Alert from '../../components/UI/Alert/Alert'
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs'
import CategoryEditing from '../CategoryEditing/CategoryEditing'
import Loading from '../../components/Loading/Loading'
import {connect} from 'react-redux'
import {fetchCategory} from '../../store/actions/category'


class Category extends Component {
    renderCategoriesList(){
        const categories = this.props.categories
        if(categories.length>0){
            return (
                <ul className="Category-list">
                    {
                        categories.map((item, index)=>{
                            return (
                                <li key={index}><NavLink data-id={item._id} to={`category/editing/${item._id}`}>{item.name}</NavLink></li>
                            )
                        })
                    }
             </ul>
            )
        }

        return 'У Вас пока нет доступных категорий'
    }

    componentDidMount(){
        this.props.fetchCategory()
    }


    render(){
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
                   {this.props.alertMessage.show ? <Alert type={this.props.alertMessage.type} message={this.props.alertMessage.message}/> : null}
                   <Switch>
                        <Route exact path={'/category'}>
                            {this.props.loading ? <Loading /> :this.renderCategoriesList()}
                        </Route>
                        <Route path={'/category/editing/:id?'} component={CategoryEditing}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        categories: state.category.categories,
        alertMessage: state.alertMessage.alertMessage,
        loading: state.category.loading
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchCategory: () => dispatch(fetchCategory())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
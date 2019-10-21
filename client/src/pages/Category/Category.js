import React, {Component} from 'react'
import './Category.css'
import {NavLink, Link} from 'react-router-dom'

import Button from '../../components/UI/Button/Button'
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs'
import CategoryEditing from './CategoryEditing/CategoryEditing'


class Category extends Component {

    state = {
        сategories: [
            {
                title: 'Категория 1',
                to: '/category1'
            },
            {
                title: 'Категория 2',
                to: '/category2'
            },
            {
                title: 'Категория 2',
                to: '/category2'
            },

        ]
    }

    renderCategoriesList = () => {
        const categories = this.state.сategories

        if(categories){
            return (
                <ul className="Category-list">
                    {
                        categories.map((item, index)=>{
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

    render(){
        return(
            <div className="Category">
                <Breadcrumbs />
                <div className="page-title">
                    <h1> Категории</h1>
                    <Link to={'/category/editing'}>
                        <Button className={'success'}>Добавить категорию</Button>
                    </Link>
                </div>
                <CategoryEditing />
                <div className="Category-box">
                   {this.renderCategoriesList()}
                </div>



            </div>
        )
    }
}

export default Category
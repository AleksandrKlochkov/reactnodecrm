import React from 'react'
import './Search.css'

const Search = props => {
    return(
    <form action="#">
        <div className="Search">
            <div className="Search-box small">
                <input type="text" name="search" className="form-control" placeholder="Поиск..."/>
                <span className="Search-btn">
                    <button type="submit" name="search" id="search-btn" className="btn btn-flat">
                        <i className="fa fa-search"></i>
                    </button>
                </span>
            </div>
        </div>
    </form>
    )
}

export default Search
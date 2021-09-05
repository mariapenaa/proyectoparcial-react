import React , {Component} from 'react';
import './filter.css';

class Filter extends Component{
    constructor(props){
        super(props)
    
    }

    render(){
        return(
            <div className="filter-items">
                <p>Ordenar ASC/ DESC</p>
                <i className="fas fa-th"></i>
                <i className="fas fa-align-justify"></i>
            </div>
        )
    }
}

export default Filter;
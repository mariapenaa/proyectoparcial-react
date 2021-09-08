import React , {Component} from 'react';
import './filter.css';

class Filter extends Component{
    constructor(props){
        super(props)
        this.state ={
            grid: false
        }


    }



    render(){
        return(
            <div className="filter-items">
                <p onClick={()=>this.props.changeOrientation()}>Ordenar ASC/ DESC</p>
                <i className="fas fa-th"  ></i>
                <i className="fas fa-align-justify"></i>
            </div>
        )
    }
}

export default Filter;
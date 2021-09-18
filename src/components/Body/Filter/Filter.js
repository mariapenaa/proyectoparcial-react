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
                <p>Ordenar <span onClick={()=>this.props.sortAsc()}>ASC</span>/  <span onClick={()=>this.props.sortDesc()}>DESC</span></p>
                <i className={`fas ${this.props.grid ? 'fa-align-justify' : 'fa-th'}`} onClick={()=>this.props.changeOrientation()}></i>
            </div>
        )
    }
}

export default Filter;
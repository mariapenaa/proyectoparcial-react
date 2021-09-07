import React , {Component} from 'react';
import './filter.css';

class Filter extends Component{
    constructor(props){
        super(props)
        this.state ={
            valor: ''
    }
}
    evitarSubmit(evento){
        evento.preventDefault();
    }
    controlarCambios(cambios){
        this.setState({
            filterBy: cambios.target.value
        }, ()=> this.props.filtrarAlbumes(this.state.filterBy))
    }

    render(){
        return(
            <div className="filter-items">
                <p>Ordenar ASC/ DESC</p>
                <i className="fas fa-th"></i>
                <i className="fas fa-align-justify"></i>
                <form action="" onSubmit={(evento)=>this.controlarCambios(evento)} value={this.state.filterBy}></form>
            </div>
        )
    }
}

export default Filter;
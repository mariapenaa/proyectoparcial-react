import React, {Component} from 'react';

class FilterField extends Component{
    constructor(){
        super();
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
            <form action="" onSubmit={(evento)=>this.controlarCambios(evento)} value={this.state.filterBy}></form>
        )
    }
}
export default FilterField
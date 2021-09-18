import React , {Component} from 'react';
import './search.css';

class Search extends Component{
    constructor(props){
        super(props)
        this.state ={
            valor:''
        }
    }
    evitarSubmit(evento){
        evento.preventDefault();
    }
    controlarCambios(cambios){
        this.setState({
            valor: cambios.target.value
        }, () => this.props.searchAlbum(this.state.valor))
    }

    

    render(){
        return(
            <form className='search' action="" onSubmit={(evento)=>this.evitarSubmit(evento)}>
                <input type="text" onChange ={(cambioEvento)=> this.controlarCambios(cambioEvento)} 
                value={this.state.valor} placeholder="Buscar album" className='inputSearch'/>
            </form>
        )
    }
}

export default Search;
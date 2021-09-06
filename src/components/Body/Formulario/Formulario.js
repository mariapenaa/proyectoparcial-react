import React, {Component} from 'react';

class Formulario extends Component{
    constructor(){
        super();
        this.state ={
            valor:''
        }
    }
    evitarSubmit(evento){
        evento.preventDefault();
    }
    controlarCambios(cambios){
        this.setState({
            valor: cambios.target.valor
        }, ()=> console.log(this.state.valor))
    }

    render(){
        return(
            <form action="" onSubmit={(evento)=>this.evitarSubmit(evento)}>
                <input type="text" onChange ={(cambioEvento)=> this.controlarCambios(cambioEvento)} value={this.state.valor} placeholder="Buscar album" />
                <button type="submit">Enviar</button>
            </form>
        )
    }
}
export default Formulario

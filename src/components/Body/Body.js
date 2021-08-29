import React , {Component} from 'react';
import './body.css';
import Card from './Card/Card'

class Body extends Component{
    constructor(props){
        super(props)
    
    }

    render(){
        return(
            <main>
                <button type="button">Cargar más tarjetas</button>
                <section class="card-container">
                    <Card />
                </section>
            </main>
        )
    }
}

export default Body;
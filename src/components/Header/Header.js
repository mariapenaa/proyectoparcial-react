import React , {Component} from 'react';
import './header.css';
import Filter from './Filter/Filter';
import Search from './Search/Search';

class Header extends Component{
    constructor(props){
        super(props)
    
    }
    render(){
        return(
            <header>
                <h1>Título/ Nombre de la app</h1>
                <section className="header-items">
                    <Filter />
                    <Search />
                </section>
            </header>
        )
    }
}

export default Header;
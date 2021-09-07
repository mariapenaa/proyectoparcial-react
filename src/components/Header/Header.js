import React , {Component} from 'react';
import './header.css';
import Filter from './Filter/Filter';
import Search from './Search/Search';

class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            album: [],
            albumesIniciales: [],
        }
    
}
filtrarAlbumes(filtrar){
    let albumFiltrado = this.state.albumesIniciales.filter(album => album.name.toLowerCase().includes(filtrar.toLowerCase()));
    this.setState({
        albumes: albumFiltrado
    })
}
    render(){
        return(
            <header>
                <h1 className='header-title'>Título/ Nombre de la app</h1>
                <section className="header-items">
                    <Filter  filtrarAlbumes ={(filtrar) =>this.filtrarAlbumes(filtrar)}/>
                    <Search />
            
                </section>
            </header>
        )
    }
}

export default Header;
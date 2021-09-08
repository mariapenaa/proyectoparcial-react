import React , {Component} from 'react';
import './body.css';
import Card from './Card/Card';
import Header from './Header/Header'
import Search from './Search/Search'
import Filter from './Filter/Filter'

class Body extends Component{
    constructor(props){
        super(props)
        this.state={
            album: [],
            albumesIniciales: [],
            isLoaded: false,
            nextUrl: 20,
            grid:true
        }
    
    }

    componentDidMount(){
        let urlChart = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/albums`;
/*         let urlAlbum = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/302127' */

        fetch(urlChart)
            .then( response => response.json() )
            .then( data => {
                console.log(data);
                this.setState({
                    album: data.data,
                    albumesIniciales: data.data,
                    isLoaded: true,
                })
            } )
            .catch( error => console.log(error) )
    }

    cargarMas(){
        let urlMore = `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums&top?limit=${this.state.nextUrl}`;


        fetch(urlMore)
        .then( response => response.json() )
        .then( data => {
            let newList = data.data.filter(element => element.position > this.state.nextUrl - 10)
            console.log(newList);
          /*   this.setState({
                album: data.data,
                isLoaded: true,
            }) */
            this.setState({
                nextUrl: this.state.nextUrl+10,
                isLoaded: true,
                album: this.state.album.concat(newList),
                albumesIniciales:this.state.album.concat(newList),
            })
        } )
        .catch( error => console.log(error) )

    }

    borrarTarjeta(tarjetaABorrar){
        let tarjetasQueQuedan = this.state.album.filter( a => a.id !== tarjetaABorrar);
         this.setState({
            album: tarjetasQueQuedan
        }) 
    }
    
    searchAlbum(textoAFiltrar){
        let albumesFiltrados = this.state.albumesIniciales.filter( album =>  album.title.toLowerCase().includes(textoAFiltrar.toLowerCase()));
         this.setState({
            album: albumesFiltrados
        })   
    }

    changeOrientation = () =>{
        if(this.state.grid){
            this.setState({
                grid:false
            })
        }else {
            this.setState({
                grid:true
            })
        }
        console.log(this.state.grid)
    }


  
    render(){
        return(
            <React.Fragment>
                <header>
                    <h1 className='header-title'>Título/ Nombre de la app</h1>
                    <section className="header-items">
                        <Filter changeOrientation={()=>this.changeOrientation()} />
                        <Search  searchAlbum={(textoAFiltrar)=>this.searchAlbum(textoAFiltrar)}/>
                    </section>
                </header>
                <main>
                    <div className="bodyButton">
                        <button className='bodyCargarMas' type="button" onClick={()=>this.cargarMas()}>Cargar más tarjetas </button>
                    </div>
                    <section className={`${this.state.grid ? 'bodyContainerGrid' : 'bodyContainerCol'}`}>
                        {this.state.album.map((album,idx) => <Card key={album.name + idx} dataAlbum={album} grid={this.state.grid} remove={(tarjetaABorrar) => this.borrarTarjeta(tarjetaABorrar)}/>)}
                    </section>
                </main>
            </React.Fragment>
        )
    }
}

export default Body;
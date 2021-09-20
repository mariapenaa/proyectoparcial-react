import React , {Component} from 'react';
import './body.css';
import Card from './Card/Card';
import Search from './Search/Search'
import Filter from './Filter/Filter'

class Body extends Component{
    constructor(props){
        super(props)
        this.state={
            album: [],
            albumesIniciales: [],
            ordenAlbumes: [],
            isLoaded: false,
            isLoadedMore: true,
            nextUrl: 20,
            grid:true,
            infoAlbum: [],
        }
    
    }

    componentDidMount(){
        let urlChart = `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums`;

        fetch(urlChart)
            .then( response => response.json() )
            .then( data => {
                this.setState({
                    album: data.data,
                    albumesIniciales: data.data,
                    ordenAlbumes:data.data,
                })
                this.state.album.map(e=>{
                    fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/${e.id}`)
                    .then( response => response.json() )
                    .then( data => {
                        if(e.id==data.id){
                            e["info"]=data;
                        }
                    } )
                    .catch( error => console.log(error) )
                })
                this.setState({
                    isLoaded:true,
                })
                console.log(this.state.album)
            } )
            .catch( error => console.log(error) )

    }



    cargarMas(){
        this.setState({
            isLoadedMore:false,
        })
        let urlMore = `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums&top?limit=${this.state.nextUrl}`;
        fetch(urlMore)
        .then( response => response.json() )
        .then( data => {
            let newList = data.data.filter(element => element.position > this.state.nextUrl - 10)
            this.setState({
                nextUrl: this.state.nextUrl+10,
                album: this.state.album.concat(newList),
                albumesIniciales:this.state.album.concat(newList),
                ordenAlbumes:this.state.album.concat(newList),
            })
            this.state.album.map(e=>{
                fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/${e.id}`)
                .then( response => response.json() )
                .then( data => {
                    if(e.id==data.id){
                        e["info"]=data;
                    }
                    this.setState({
                        album:this.state.album
                    })
                } )
                .catch( error => console.log(error) )
            })
            this.setState({
                isLoadedMore:true,
            })
            
        } )
        .catch( error => console.log(error) )
    }

    borrarTarjeta(tarjetaABorrar){
        let tarjetasQueQuedan = this.state.album.filter( a => a.id !== tarjetaABorrar);
         this.setState({
          album: tarjetasQueQuedan, 
          albumesIniciales: tarjetasQueQuedan,
          ordenAlbumes:tarjetasQueQuedan,
     }) 
    }
    
    searchAlbum(textoAFiltrar){
        let albumesFiltrados = this.state.albumesIniciales.filter( album =>  album.title.toLowerCase().includes(textoAFiltrar.toLowerCase()));
        this.setState({
            album: albumesFiltrados,
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

    sortAsc(){
        let sorteados = this.state.ordenAlbumes.sort((a,b)=> a.title.localeCompare(b.title))
         this.setState({
            album:sorteados,
        }) 
        console.log(this.state.album)
    }

    sortDesc(){
        let sorteados = this.state.ordenAlbumes.sort((a,b)=> a.title.localeCompare(b.title));
        let reverse = sorteados.reverse()
         this.setState({
            album:reverse,
        }) 
        console.log(this.state.album)
    }

  
    render(){
        return(
            <div className="main-container">
                <header>
                    <img className='logo' src='/images/logo3.jpeg'/>
                    <section className="header-items">
                        <Filter changeOrientation={()=>this.changeOrientation()} sortAsc={()=>this.sortAsc()} sortDesc={()=>this.sortDesc()} grid={this.state.grid}/>
                        <Search  searchAlbum={(textoAFiltrar)=>this.searchAlbum(textoAFiltrar)}/>
                    </section>
                </header>
                <main>
                    <div className="bodyButton">
                        <button className='bodyCargarMas' type="button" onClick={()=>this.cargarMas()}>Cargar más tarjetas </button>
                    </div>
                    {this.state.isLoaded ? (
                    <section className={`${this.state.grid ? 'bodyContainerGrid' : 'bodyContainerCol'}`}>
                        {this.state.album.length <1  ? <p className="nohay">No hay albumes con este nombre :(</p>: ""}
                        {this.state.album.map((album,idx) => <Card key={idx} dataAlbum={album} dataInfo={this.state.infoAlbum}  grid={this.state.grid} remove={(tarjetaABorrar) => this.borrarTarjeta(tarjetaABorrar)} />)}
                        {this.state.isLoadedMore ? " " : (
                            <div className="spinner-container1">
                                <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                            </div> 
                        )}
                    </section>
                    ):(
                        <div className="spinner-container">
                            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
                    )} 
                </main>
            </div>
        )
    }
}

export default Body;
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
            isLoaded: false,
            nextUrl: 20,
            grid:true,
            infoAlbum: [],
        }
    
    }

    componentDidMount(){
        let urlChart = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/albums`;
/*         let urlAlbum = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/302127' */

        fetch(urlChart)
            .then( response => response.json() )
            .then( data => {
                this.setState({
                    album: data.data,
                    albumesIniciales: data.data,
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
                    isLoaded:true,
                })
                console.log(this.state.album)
            } )
            .catch( error => console.log(error) )

    }



    cargarMas(){
        let urlMore = `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums&top?limit=${this.state.nextUrl}`;
        fetch(urlMore)
        .then( response => response.json() )
        .then( data => {
            let newList = data.data.filter(element => element.position > this.state.nextUrl - 10)
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
                isLoaded:true,
            })
            
        } )
        .catch( error => console.log(error) )

    }

    borrarTarjeta(tarjetaABorrar){
        let tarjetasQueQuedan = this.state.album.filter( a => a.id !== tarjetaABorrar);
         this.setState({
          album: tarjetasQueQuedan, 
          albumesIniciales: tarjetasQueQuedan
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
    viewMore(id){
        let urlView = `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/${id}`
        fetch(urlView)
        .then( response => response.json() )
        .then( data => {
           this.setState({
               infoAlbum:data
           }) 
        } )

        .catch( error => console.log(error) )

    
    }
     clearInfo(){
         this.setState({
             infoAlbum: {}
         })
     }

  
    render(){
        return(
            <React.Fragment>
                <header>
                    <img className='logo' src='/images/logo2.jpeg'/>
                    <section className="header-items">
                        <Filter changeOrientation={()=>this.changeOrientation()} />
                        <Search  searchAlbum={(textoAFiltrar)=>this.searchAlbum(textoAFiltrar)}/>
                    </section>
                </header>
                <main>
                    <div className="bodyButton">
                        <button className='bodyCargarMas' type="button" onClick={()=>this.cargarMas()}>Cargar más tarjetas </button>
                    </div>
                    {this.state.isLoaded ? (
                    <section className={`${this.state.grid ? 'bodyContainerGrid' : 'bodyContainerCol'}`}>
                        {this.state.album.map((album,idx) => <Card key={album.name + idx} dataAlbum={album} dataInfo={this.state.infoAlbum}  grid={this.state.grid} remove={(tarjetaABorrar) => this.borrarTarjeta(tarjetaABorrar)} loadInfo={(id)=> this.viewMore(id)} clearInfo={()=> this.clearInfo()}/>)}
                    </section>
                    ):(
                        <div><iframe src="https://giphy.com/embed/3oEjI6SIIHBdRxXI40" width="100%" height="100%" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>
                    )}
                    
                </main>
            </React.Fragment>
        )
    }
}

export default Body;
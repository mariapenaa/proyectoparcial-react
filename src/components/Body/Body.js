import React , {Component} from 'react';
import './body.css';
import Card from './Card/Card'

class Body extends Component{
    constructor(props){
        super(props)
        this.state={
            album: [],
            albumesIniciales: [],
            isLoaded: false,
            nextUrl: 20,
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
        let urlMore = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/albums&top?limit=${this.state.nextUrl}`;


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
                album: this.state.album.concat(newList)
            })
        } )
        .catch( error => console.log(error) )

    }

    borrarTarjeta(tarjetaABorrar){
        let tarjetasQueQuedan = this.state.album.filter( album => album.id !== tarjetaABorrar);

        this.setState({
            album: tarjetasQueQuedan
        })
    }
  
    render(){
        return(
            <main>
                <div className="bodyButton">
                    <button type="button" onClick={()=>this.cargarMas()}>Cargar más tarjetas </button>
                </div>
                <section class="bodyContainer">
                    {this.state.album.map((album,idx) => <Card key={album.name + idx} dataAlbum={album} remove={(tarjetaABorrar) => this.borrarTarjeta(tarjetaABorrar)}/>)}
                </section>
            </main>
        )
    }
}

export default Body;
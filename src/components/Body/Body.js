import React , {Component} from 'react';
import './body.css';
import Card from './Card/Card'

class Body extends Component{
    constructor(props){
        super(props)
        this.state={
            album: [],
            isLoaded: false,
            nextUrl: '',
        }
    
    }

    componentDidMount(){
        let urlChart = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/albums';
/*         let urlAlbum = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/302127' */

        fetch(urlChart)
            .then( response => response.json() )
            .then( data => {
                console.log(data);
                this.setState({
                    album: data.data,
                    isLoaded: true,
                })
            } )
            .catch( error => console.log(error) )
    }

    render(){
        return(
            <main>
                <div className="bodyButton">
                    <button type="button">Cargar más tarjetas </button>
                </div>
                <section class="bodyContainer">
                    {this.state.album.map((album,idx) => <Card key={album.name + idx} dataAlbum={album}/>)}
                </section>
            </main>
        )
    }
}

export default Body;
import React , {Component} from 'react';
import './card.css';

class Card extends Component{
    constructor(props){
        super(props)
        this.state={
            text: 'ver más',
            viewMore: false,
        }
    }

    viewMore(id){
        if(this.state.viewMore){
            this.setState({
                text: 'ver más',
                viewMore: false,
            })
        }else{
            this.setState({
                text: 'ver menos',
                viewMore: true,
            });
        }
    }

    render(){
        let {cover_medium, artist, id} = this.props.dataAlbum;
            return(
                <article className={`card ${this.props.grid ? 'gridCard' : 'colCard'}`}>
                    <section className={`cardNavigation ${this.props.grid ? 'cardNavGrid' : 'cardNavCol'}`}>
                       
                        <i className="far fa-window-close" onClick={()=>this.props.remove(id)}></i>
                    </section>
                    <main className={`cardMain ${this.props.grid ? 'gridCard' : 'colCard'}`}>
                        <div className='cardDiv'>
                            <img className="cardImage" src={`${cover_medium}`} alt=""/>
                            <h3 className='cardTitle'>{this.props.dataAlbum.title}</h3>
                        </div>
                        <section className="cardInfo">
                            <div className="artistInfo">
                                <img className="cardArtistImage" src={`${artist.picture_small}`} alt="" />
                                <p className="cardDescription">{artist.name}</p>
                            </div>
                            <p className='more' onClick={() => this.viewMore(id)}>{this.state.text}</p>
                        </section>
                        <section className={`${this.state.viewMore ? 'cardShow' : 'cardHide'}`}>
                         <p className='info'>{artist.name} has {this.props.dataAlbum.info ? this.props.dataAlbum.info.fans : ''} fans.</p>
                        <p className='info'>Tracks: {this.props.dataAlbum.info ? this.props.dataAlbum.info.nb_tracks : ''}</p>
                        <p className='info'>Release Date: {this.props.dataAlbum.info ? this.props.dataAlbum.info.release_date : ''}</p>
                        <p className='info'>Genre: {this.props.dataAlbum.info ? this.props.dataAlbum.info.genres.data[0].name : ''}</p>
                        </section>
                    </main>
                </article>
            )
    }
}

export default Card;
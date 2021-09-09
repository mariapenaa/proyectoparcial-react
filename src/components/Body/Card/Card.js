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
            },()=> this.props.clearInfo())
        }else{
            this.setState({
                text: 'ver menos',
                viewMore: true,
            }, ()=> this.props.loadInfo(id));
        }
    }

    render(){
        let {cover_medium, artist, id} = this.props.dataAlbum
        return(
            <article className={`card ${this.props.grid ? 'gridCard' : 'colCard'}`}>
                <section className={`cardNavigation ${this.props.grid ? 'cardNavGrid' : 'cardNavCol'}`}>
                    <div>
                        <i className="fas fa-chevron-left"></i>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                    <i className="far fa-window-close" onClick={()=>this.props.remove(id)}></i>
                </section>
                <main className={`cardMain ${this.props.grid ? 'gridCard' : 'colCard'}`}>
                    <img className="cardImage" src={`${cover_medium}`} alt="" />
                    <h3 className='cardTitle'>{this.props.dataAlbum.title}</h3>
                    <section className="cardInfo">
                        <div className="artistInfo">
                            <img className="cardArtistImage" src={`${artist.picture_small}`} alt="" />
                            <p className="cardDescription">{artist.name}</p>
                        </div>
                        <p className='more' onClick={() => this.viewMore(id)}>{this.state.text}</p>
                    </section>
                    <section className={`${this.state.viewMore ? 'cardShow' : 'cardHide'}`}>
                     <p> Fans: {this.props.dataInfo.fans}</p>
                    <p> Tracks: {this.props.dataInfo.nb_tracks}</p>
                    <p>Release Date: {this.props.dataInfo.release_date}</p>
                    </section>
                </main>
            </article>
        )
    }
}

export default Card;
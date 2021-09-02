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

    viewMore(){
        if(this.state.viewMore){
            this.setState({
                text: 'ver más',
                viewMore: false,
            })
        }else{
            this.setState({
                text: 'ver menos',
                viewMore: true,
            })
        }
    }

    render(){
        return(
            <article>
                <section className="navigation">
                    <div>
                        <i className="fas fa-chevron-left"></i>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                    <i className="far fa-window-close"></i>
                </section>
                <main>
                    <h3>{this.props.dataAlbum.title}</h3>
                    <img src={`${this.props.dataAlbum.cover_medium}`} alt="" />
                    <img src={`${this.props.dataAlbum.artist.picture_small}`} alt="" />
                    <p className="description">{this.props.dataAlbum.artist.name}</p>
                    <p className='more' onClick={() => this.viewMore()}>{this.state.text}</p>
                    <section className={`${this.state.viewMore ? 'cardShow' : 'cardHide'}`}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse qui atque.</p>
                    </section>
                </main>
            </article>
        )
    }
}

export default Card;
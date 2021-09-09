import React , {Component} from 'react';
import './footer.css';

class Footer extends Component{
    constructor(props){
        super(props)
    
    }

    render(){
        return(
            <footer>
                <ul className="footer-team">
                    <li>Catalina Arias</li>
                    <li>María Peña</li>
                    <li>Felicitas Rattagan</li>
                </ul>
            </footer>
        )
    }
}

export default Footer;
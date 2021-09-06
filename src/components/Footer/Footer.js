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
                    <li>Nombre integrante 1</li>
                    <li>Nombre integrante 2</li>
                    <li>Nombre integrante 3</li>
                    <li>https://cors-anywhere.herokuapp.com/corsdemo</li>
                </ul>
            </footer>
        )
    }
}

export default Footer;
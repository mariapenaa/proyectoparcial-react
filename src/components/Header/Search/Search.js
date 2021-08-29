import React , {Component} from 'react';
import './search.css';

class Search extends Component{
    constructor(props){
        super(props)
    
    }

    render(){
        return(
            <form action="">
                <input type="text" name="search" id="" placeholder="Search" />
                <button type="submit"><i className="fas fa-search"></i></button>
            </form>
        )
    }
}

export default Search;
import React, {Component} from 'react';


class Search_Streams extends Component {

    
    constructor(props){
        
        super(props);
        
        this.state = {
            
        };

    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(prevProps === this.props){
            return;
        }
        
        this.setState(this.props);
        
    }
    
    render(){
        
        return (
                <div id="search-streams">
                    
                    
                    
                </div>
            );
    }
}

export default Search_Streams;
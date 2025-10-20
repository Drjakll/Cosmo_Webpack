import React, {Component} from 'react';
import './channel_selections.less';

class Channel_Selections extends Component {

    constructor(props){
        
        super(props);

        this.state = {
        };  
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    render(){

        return (
                <div id="channel-selections">

                    
                    
                </div>
            );
    }
}

export default Channel_Selections;
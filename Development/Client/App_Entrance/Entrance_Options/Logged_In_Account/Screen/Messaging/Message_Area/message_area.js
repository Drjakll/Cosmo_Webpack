import React, {Component} from 'react';
import './message_area.less';

class Message_Area extends Component {

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
                <div id="message-area">

                    
                    
                </div>
            );
    }
}

export default Message_Area;
import React, {Component} from 'react';

class Message extends Component {
    
    constructor(props){
        
        super(props);
        
        let {first_name, last_name, timestamp, text} = this.props.data;
        
        this.state = {
            first_name: first_name,
            last_name: last_name,
            timestamp: timestamp,
            text: text
        };
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    render(){
        
        return <div id="message">
            
            
            
        </div>;
    }
}

export default Message;
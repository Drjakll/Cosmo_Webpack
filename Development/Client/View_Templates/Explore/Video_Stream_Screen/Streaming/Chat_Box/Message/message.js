import React, {Component} from 'react';
import './message.less';

class Message extends Component {
    
    constructor(props){
        
        super(props);
        
        let {first_name, last_name, timestamp, text, id} = this.props.data;
        
        this.state = {
            first_name: first_name,
            last_name: last_name,
            timestamp: timestamp,
            text: text, 
            sender_id: id
        };
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    render(){

        let { first_name, last_name, timestamp, text, sender_id } = this.state;
        let { id } = this.props.my_room_tag;

        return <div id="message" className={`${id === sender_id ? "self-parent" : "others-parent"}`}>

            <div id="msg-info" className={`${ id === sender_id ? "self" : "others"}`}>

                <div id="name">{`${first_name} ${last_name}`}</div>

                <div id="timestamp">{timestamp}</div>

            </div>

            <pre id="msg" className={`${id === sender_id ? "self" : "others"}`}>

                {text}

            </pre>
            
        </div>;
    }
}

export default Message;
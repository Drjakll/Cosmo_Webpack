import React, {Component} from 'react';
import './message.less';

class Message extends Component {
    
    constructor(props){
        
        super(props);
        
        let { first_name, last_name, timestamp, text, id, profile_picture_link } = this.props.data;

        Message.contextType = window.Context;
        
        this.state = {
            first_name: first_name,
            last_name: last_name,
            timestamp: timestamp,
            text: text, 
            sender_id: id,
            profile_picture_link: profile_picture_link
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
        let { Request_URLs } = this.context;
        let { aws_s3_url } = Request_URLs;

        return <div id="message" className={`${id === sender_id ? "self-parent" : "others-parent"}`}>

            <div id="msg-info" className={`${id === sender_id ? "self" : "others"}`}>

                <div id="profile-picture-message" style={{ backgroundImage: `url('${aws_s3_url}${this.state.profile_picture_link}')` }}>

                </div>

                <div id="name-time" className={`${id === sender_id ? "name-self" : "name-others"}`}>

                    <div id="name">{`${first_name} ${last_name}`}</div>

                    <div id="timestamp">{timestamp}</div>

                </div>

            </div>

            <pre id="msg" className={`${id === sender_id ? "self" : "others"}`}>

                {text}

            </pre>
            
        </div>;
    }
}

export default Message;
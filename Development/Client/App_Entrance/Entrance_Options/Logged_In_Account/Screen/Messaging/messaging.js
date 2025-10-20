import React, {Component} from 'react';
import Message_Area from './Message_Area/message_area.js';
import Online_Users from './Online_Users/online_users.js';
import Channel_Selections from './Channel_Selections/channel_selections.js';
import './messaging.less';

class Messaging extends Component {

    constructor(props){
        
        super(props);

        
        this.state = {
            account_data: this.props.account_data,
            connection_list: this.props.connection_list
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
                <div id="messaging">

                    <div id="top-section">

                        <div id="channel-selections-wrapper">

                            <Channel_Selections />

                        </div>

                        <div id="online-users-wrapper">

                            <Online_Users />

                        </div>

                    </div>

                    <div id="bottom-section">

                        <div id="message-area-wrapper">

                            <Message_Area />

                        </div>


                    </div>
                    

                    
                </div>
            );
    }
}

export default Messaging;
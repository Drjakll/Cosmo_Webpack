import React, {Component} from 'react';
import Message_Area from './Message_Area/message_area.js';
import Users from './Users/users.js';
import Channel_Selections from './Channel_Selections/channel_selections.js';
import './messaging.less';

class Messaging extends Component {

    constructor(props){
        
        super(props);

        
        this.state = {
            account_data: this.props.account_data,
            connection_list: this.props.connection_list,
            visible_users: []
        };  
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    Update_Visible_Users = (visible_users)=>{

        this.setState({
            visible_users: visible_users
        });
    }

    render(){

        return (
                <div id="messaging">

                    <div id="top-section">

                        <div id="channel-selections-wrapper">

                            <Channel_Selections 
                                connection_list={this.state.connection_list} 
                                account_data={this.state.account_data}
                                update_visible_users={this.Update_Visible_Users}
                            />

                        </div>

                        <div id="online-users-wrapper">

                            <Users visible_users={this.state.visible_users}/>

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
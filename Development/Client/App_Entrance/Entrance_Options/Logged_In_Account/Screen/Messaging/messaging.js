import React, {Component} from 'react';
import Message_Area from './Message_Area/message_area.js';
import Users from './Users/users.js';
import Channel_Selections from './Channel_Selections/channel_selections.js';
import { io } from 'socket.io-client';
import './messaging.less';

class Messaging extends Component {

    All_Room_Tags = {};

    constructor(props){
        
        super(props);

        Messaging.contextType = window.Context;

        
        this.state = {
            account_data: this.props.account_data,
            connection_list: this.props.connection_list,
            visible_users: [],
            conversations: {public: {}, private: {}},
            selected_room_tag: "",
            selected_users: {}, //Selected users for any purpose, (example: add selected users to a conversation)
            private_or_public: "private"
        };  
    }

    componentDidMount(){

        this.Init_IO();

        this.Get_Conversations();

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

    Get_Conversations = async () => {

        let {get_conversations} = this.context.Request_URLs;

        let requirements = {
            users: [this.state.account_data.email]
        };

        let data = await( await fetch(get_conversations,
            {
                method: "POST",
                body: JSON.stringify(requirements),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();

        if(data){

            let private_conv_json_format = {};

            for(let convers of data.conversations){

                let ptr = convers;

                ptr.users = JSON.parse(ptr.users);
                ptr.messages = JSON.parse(ptr.messages);
                ptr.seen_by = JSON.parse(ptr.seen_by);
                ptr.online_users = {};

                this.All_Room_Tags[convers.room_tag] = convers.room_tag;

                private_conv_json_format[convers.room_tag] = ptr;
            }

            let {conversations} = this.state;

            conversations.private = private_conv_json_format;

            this.setState({conversations});

            //Join all the conversations in the websocket under the name room_tag
            this.msg_socket?.emit('join_private_channels', {private_conversations: private_conv_json_format, email: this.state.account_data.email});
        }
    }

    Init_IO = ()=>{

        this.msg_socket = io('/messaging');

        this.msg_socket?.on('connect', ()=>{

            //Report user's presence within the socket namespace
            this.msg_socket.emit('report_presence', {email: this.state.account_data.email});

            this.msg_socket.emit('join_private_channels', this.state.conversations.private);

        });

        this.msg_socket?.on('receive_msg', ({room_tag, msg_obj})=>{

            this.Recieve_Msg(room_tag, msg_obj);

            this.Clear_Seen_By(room_tag, msg_obj.from.email);

        });

        this.msg_socket?.on('save_conversation', ({selected_room_tag})=>{

            this.Save_Conversation(selected_room_tag);

        });

        this.msg_socket?.on('clear_seen_by', async ({room_tag, signal_sent_by})=>{

            let {conversations, account_data} = this.state;

            conversations.private[room_tag]?.seen_by = {};

            conversations.private[room_tag]?.seen_by[signal_sent_by] = signal_sent_by;

            await this.setState({conversations});

            //Only wanted the person who sent the signal to update the conversation once
            if(signal_sent_by === account_data.email){
                this.Save_Conversation(room_tag);
            }
        });

        this.msg_socket?.on('update_seen_by', async ({room_tag, seen_by})=>{

            let {conversations, account_data} = this.state;

            conversations.private[room_tag]?.seen_by[seen_by] = seen_by;

            await this.setState({conversations});

            //Only wanted the person who sent the signal to update the conversation once
            if(seen_by === account_data.email){
                this.Save_Conversation(room_tag);
            }

        });

        this.msg_socket?.on('refresh_conversation_list', ()=>{

            this.Get_Conversations();

        });

        //massive_send_out means this report is being sent to a massive amount of users
        this.msg_socket?.on('report_online', ({email, room_tag, massive_send_out})=>{

            let {conversations, account_data} = this.state;

            conversations.private[room_tag].online_users[email] = true;

            this.setState({conversations});

            //If it's being sent to a massive amount of users, that mean each individual user of that mass must send back to acknowledge their own online status back to the sender
            if(massive_send_out){
                this.msg_socket?.emit('send_report_online', {from_email: account_data.email, to_email: email, room_tag});
            }

        });

        this.msg_socket?.on('report_offline', ({room_tag, email})=>{

            let {conversations} = this.state;

            delete conversations.private[room_tag].online_users[email];

            this.setState({conversations});

        });

        //Send a ping to the websocket every 10 seconds to ensure that this user is online
        setInterval(()=>{

            this.msg_socket?.emit('ping', {email: this.state.account_data.email, room_tags: this.All_Room_Tags});

        }, 10000);
    }

    Leave_Channel = (room_tag, remaining_users)=>{

        this.msg_socket?.emit('leave_conversation', {room_tag, remaining_users});

        delete this.All_Room_Tags[room_tag];
    }

    Refresh_Conversation_List = (other_party_emails)=>{

        this.msg_socket?.emit('refresh_conversation_list', {other_party_emails});

    }

    Send_Message = (msg)=>{

        let {selected_room_tag, account_data} = this.state;

        if(!selected_room_tag){
            alert("No conversation is selected");
            return;
        }

        let from = {email: account_data.email};

        let msg_obj = {from, msg, timestamp: 0};

        this.msg_socket?.emit('send_msg_to_channel', {room_tag: selected_room_tag, msg_obj});
    }

    Save_Conversation = async (current_room_tag)=>{

        let conversation_info = this.state.conversations.private[current_room_tag];

        let {users, messages, room_tag, seen_by} = conversation_info;

        let {update_conversation} = this.context.Request_URLs;

        let body = {
            users, messages, room_tag, seen_by
        };

        let data = await(await fetch(
            update_conversation,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

    }

    Recieve_Msg = async (room_tag, msg_obj) => {

        let {conversations} = this.state;
        
        conversations.private[room_tag].messages.push(msg_obj);

        await this.setState({conversations});
    }

    Switch_Conversation = async (private_or_public, selected_room_tag)=>{

        this.setState({
            private_or_public,
            selected_room_tag
        });
    }

    Select_User = (email)=>{

        let {selected_users} = this.state;

        //Toggle between selecting a user or not
        if(selected_users[email]){ //If user exists

            delete selected_users[email]; //Delete it

        } else {

            selected_users[email] = email //If it doesn't exist, add to selected_users
            
        }

        this.setState({selected_users});

    }

    Clear_Selected_Users = ()=>{

        this.state.selected_users = {};

        this.setState({selected_users: this.state.selected_users});
    }

    Seen_By = async (room_tag)=>{

        let {account_data, conversations} = this.state;

        if(!conversations.private[room_tag]){
            return;
        }

        let {seen_by} = conversations.private[room_tag];

        if(!seen_by || seen_by[account_data.email] !== undefined){
            return;
        }

        this.msg_socket?.emit('update_seen_by', {room_tag: room_tag, seen_by: account_data.email});
    }

    Clear_Seen_By = (room_tag, from_email)=>{

        if(!room_tag){
            return;
        }

        this.msg_socket?.emit('clear_seen_by', {room_tag: room_tag, signal_sent_by: from_email});
    }

    Set_Public_Private = (private_or_public)=>{

        this.setState({private_or_public});
    }

    Create_Public_Channel = (channel_info)=>{

        this.msg_socket?.emit('create_public_channel', {channel_info});

        let {account_data} = this.state;

        account_data.favorite_public_channel[channel_info.channel_name] = channel_info;

        this.Update_Profile(account_data);
    }

    Update_Profile = async (account_data)=>{

        let {update_profile} = this.context.Request_URLs;

        let result = await(await fetch(
            update_profile,
            {
                method: "POST",
                body: JSON.stringify(account_data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        this.setState({account_data});
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
                            set_public_private={this.Set_Public_Private}
                            create_public_channel={this.Create_Public_Channel}
                        />

                    </div>

                    <div id="online-users-wrapper">

                        <Users
                            visible_users={this.state.visible_users}
                            account_data={this.state.account_data}
                            refresh_conversation_list={this.Refresh_Conversation_List}
                            selected_users={this.state.selected_users}
                            select_user={this.Select_User}
                        />

                    </div>

                </div>

                <div id="bottom-section">

                    <div id="message-area-wrapper">

                        <Message_Area 
                            connection_list={this.state.connection_list}
                            account_data={this.state.account_data}
                            conversations={this.state.conversations}
                            selected_room_tag={this.state.selected_room_tag}
                            switch_conversation={this.Switch_Conversation}
                            send_message={this.Send_Message}
                            selected_users={this.state.selected_users}
                            refresh_conversation_list={this.Refresh_Conversation_List}
                            clear_selected_users={this.Clear_Selected_Users}
                            leave_channel={this.Leave_Channel}
                            clear_seen_by={this.Clear_Seen_By}
                            seen_by={this.Seen_By}
                            save_conversation={this.Save_Conversation}
                            private_or_public={this.state.private_or_public}
                            set_public_private={this.Set_Public_Private}
                        />

                    </div>


                </div>
                

                
            </div>
        );
    }
}

export default Messaging;
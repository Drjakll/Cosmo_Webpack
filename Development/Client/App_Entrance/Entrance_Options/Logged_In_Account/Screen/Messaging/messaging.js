import React, {Component, createRef} from 'react';
import Message_Area from './Message_Area/message_area.js';
import Users from './Users/users.js';
import Channel_Selections from './Channel_Selections/channel_selections.js';
import Get_Follows from '@universal_components/Account_Functions/get_follows.js';
import Context from '@context/context.js';
import { io } from 'socket.io-client';
import './messaging.less';

class Messaging extends Component {

    All_Room_Tags = {public: {}, private: {}}; //Use for pinging

    Pong = Date.now();

    constructor(props){
        
        super(props);

        Messaging.contextType = Context;

        this.Msg_Area_Ref = createRef();

        let {owner_user_account} = props;
        
        this.state = {
            owner_user_account,
            following: [], 
            visible_users: {},
            conversations: {public: {}, private: {}},
            selected_room_tag: null,
            selected_users: {}, //Selected users for any purpose, (example: add selected users to a private conversation)
            private_or_public: "private",
            current_users_info: {}, //Current user information that are currently in the chat room,
            msg_socket: null,
            public_channels_search_results: {}
        };  
    }

    componentWillUnmount(){
        
    }

    async componentDidMount(){

        let {owner_user_account: account} = this.state;

        await this.setState({
            following: await Get_Follows(account, false)
        });

        this.Init_IO();

        this.Get_Private_Conversations();

        this.Join_Favorite_Public_Channels();
        
        //Send a ping to the websocket every 10 seconds to ensure that this user is online
        setInterval(()=>{

            let now = Date.now();

            if(now - this.Pong > 30000){ //If no pong received in the last 30 seconds, re-initialize the IO connection
                this.Init_IO();
                return;
            }

            this.msg_socket?.emit('ping', {user_account: this.state.owner_user_account});

        }, 10000);

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    Switch_Channel = (visible_users, selected_room_tag, private_or_public)=>{

        this.setState({
            visible_users,
            selected_room_tag,
            private_or_public
        });

        this.Set_Current_Users_Info(selected_room_tag, visible_users);
    }

    Get_Private_Conversations = async () => {

        let {get_conversations} = this.context.Request_URLs;

        let {owner_user_account} = this.state;

        let requirements = {
            user: owner_user_account
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

            let {results} = data;

            let private_conversations = {};

            for(let user of results){

                let {conversation_id: id} = user;

                private_conversations[id] = private_conversations[id] || {};

                if(user.user_id === owner_user_account.id){
                    private_conversations[id].self_time_joined = user.time_joined;
                }

                private_conversations[id].id = id;

                private_conversations[id].users = private_conversations[id].users || [];

                private_conversations[id].users.push(user);

                private_conversations[id].online_users = {};

                private_conversations[id].messages = [];

                this.All_Room_Tags.private[id] = id;
                
            }

            let {conversations} = this.state;

            conversations.private = private_conversations;

            this.setState({conversations});

            this.msg_socket?.emit('join_private_channels', {private_conversations, user_id: owner_user_account.id});
        }
    }

    Get_Private_Conversation_Messages = async (conversation_id, created_on, user_time_joined)=>{

        if(!conversation_id){
            return [];
        }

        let {get_messages} = this.context.Request_URLs;

        let body = {
            conversation_id, 
            off_time_set: created_on,
            user_time_joined
        };

        let data = await( await fetch (
            get_messages,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        return data?.results;

    }

    Init_IO = ()=>{

        this.msg_socket = io('/messaging');

        this.msg_socket?.on('connect', ()=>{

            //Report user's presence within the socket namespace
            this.msg_socket.emit('report_presence', {user_id: this.state.owner_user_account.id});

            this.setState({msg_socket: this.msg_socket});

        });

        this.msg_socket?.on('pong', ()=>{
            
            this.Pong = Date.now();

        });

        this.msg_socket?.on('receive_msg', ({room_tag, msg_obj, private_or_public})=>{

            this.Recieve_Msg(room_tag, msg_obj, private_or_public);

            //No need to clear seen by if it's a public conversation
            if(private_or_public === "public"){
                return;
            }

            this.Clear_Seen_By(room_tag, msg_obj.user_id);

        });

        //Only apply to private channels/rooms
        this.msg_socket?.on('clear_seen_by', async ({room_tag, signal_sent_by})=>{

            let {conversations} = this.state;

            //Create a pointer to the users
            let users = conversations.private[room_tag].users;

            for(let i in users){

                if(users[i].user_id === signal_sent_by){
                    continue;
                }

                users[i].seen_last = false;
            }

            await this.setState({conversations});

        });

        this.msg_socket?.on('update_seen_by', async ({room_tag, seen_by})=>{

            let {conversations} = this.state;

            let users = conversations.private[room_tag].users;

            for(let i in users){

                if(users[i].user_id === seen_by){
                    users[i].seen_last = true;
                }
            }

            await this.setState({conversations});

        });

        this.msg_socket?.on('refresh_conversation_list', ()=>{

            this.Get_Private_Conversations();

        });

        //massive_send_out means this report is being sent to a massive amount of users
        this.msg_socket?.on('report_private_online', ({user_id, room_tag, massive_send_out})=>{

            let {conversations, owner_user_account} = this.state;

            conversations.private[room_tag].online_users[user_id] = true;

            this.setState({conversations});

            //If it's being sent to a massive amount of users, that mean each individual user of that mass must send back to acknowledge their own online status back to the sender
            if(massive_send_out){
                this.msg_socket?.emit('send_report_online', {from_user_id: owner_user_account.id, to_user_id: user_id, room_tag});
            }

        });

        this.msg_socket?.on('report_private_offline', ({room_tag, user_id})=>{

            let {conversations} = this.state; 

            delete conversations.private[room_tag]?.online_users[user_id];

            this.setState({conversations});

        });


        this.msg_socket?.on('report_public_offline', ({room_tag, user_id})=>{

            let {conversations, visible_users, selected_room_tag} = this.state; 

            delete conversations.public[room_tag]?.online_users[user_id];

            //In case that the room_tag doesn't exist, that's why I used new_visible_users || visible_users. And if it's not the selected room tag, kee the original visible users
            let new_visible_users = (selected_room_tag === room_tag ? conversations.public[room_tag]?.online_users || visible_users : visible_users);

            this.setState({conversations, visible_users: new_visible_users});

        });

        this.msg_socket?.on('reconnect_all_rooms', ()=>{

            
            //Re-join all the rooms again
            this.msg_socket?.emit('join_private_channels', {private_conversations: this.state.conversations.private, user_id: this.state.owner_user_account.id});

            this.msg_socket?.emit('join_public_channels', {public_channels: this.state.conversations.public, user_data: this.state.owner_user_account});

        });

        this.msg_socket?.on('update_public_online_users', ({online_users, channel_name})=>{

            let {conversations, visible_users, selected_room_tag} = this.state;

            conversations.public[channel_name]?.online_users = online_users;

            //In case that the room_tag doesn't exist, that's why I used new_visible_users || visible_users. And if it's not the selected room tag, kee the original visible users            
            visible_users = selected_room_tag == channel_name ? conversations.public[channel_name]?.online_users || visible_users : visible_users;

            this.setState({conversations, visible_users});

        });

        this.msg_socket?.on('catch_public_chats', ({channels})=>{

            this.setState({public_channels_search_results: channels});
        });


    }

    Leave_Private_Channel = async (room_tag, remaining_users)=>{

        let {leave_private_conversation, delete_conversation} = this.context.Request_URLs;
        let {id} = this.state.owner_user_account;

        let body = {
            user_id: id,
            conversation_id: room_tag
        };

        let result = await(await fetch(
            remaining_users.length === 0 ? delete_conversation : leave_private_conversation,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        if(!result){
            alert("Error leaving conversation!");
            return;
        }

        //Let the users who remains know that this user has left the conversation
        this.msg_socket?.emit('leave_private_conversation', {room_tag, remaining_users});

        delete this.All_Room_Tags.private[room_tag];
    }

    Refresh_Conversation_List = (other_party_ids)=>{

        //Private conversation list
        this.msg_socket?.emit('refresh_conversation_list', {other_party_ids});

    }

    Send_Message = async (msg)=>{

        let {selected_room_tag, owner_user_account, private_or_public} = this.state;

        if(!selected_room_tag){
            alert("No conversation is selected");
            return;
        }

        let created_on = Date.now();

        if(private_or_public === "private"){

            await this.Add_Msg_To_Conversation(selected_room_tag, msg, owner_user_account.id, created_on);

        }

        let {id, first_name, last_name, profile_picture_link} = owner_user_account;

        let msg_obj = {sender_id: id, first_name, last_name, profile_picture_link, text: msg, created_on};

        this.msg_socket?.emit('send_msg_to_channel', {room_tag: selected_room_tag, msg_obj, private_or_public});
    }

    Add_Msg_To_Conversation = async (conversation_id, text, sender_id, created_on)=>{

        let {insert_message} = this.context.Request_URLs;

        let body = {
            conversation_id,
            text,
            sender_id,
            created_on
        };

        let data = await(await fetch(
            insert_message,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        if(!data){
            alert("Something went wrong!");
        }

    }
        

    Recieve_Msg = async (room_tag, msg_obj, private_or_public) => {

        let {conversations} = this.state;
        
        conversations[private_or_public][room_tag]?.messages.push(msg_obj);

        await this.setState({conversations});
    }

    Switch_Conversation = async (private_or_public, selected_room_tag)=>{

        this.setState({
            private_or_public,
            selected_room_tag
        });
    }

    Select_User = (user_id)=>{

        let {selected_users} = this.state;

        //Toggle between selecting a user or not
        if(selected_users[user_id]){ //If user exists

            delete selected_users[user_id]; //Delete it

        } else {

            selected_users[user_id] = user_id //If it doesn't exist, add to selected_users
            
        }

        this.setState({selected_users});

    }

    Clear_Selected_Users = ()=>{

        this.state.selected_users = {};

        this.setState({selected_users: this.state.selected_users});
    }

    //Only apply to private conversations
    Seen_By = async (room_tag)=>{

        let {owner_user_account, conversations, private_or_public} = this.state;

        if(private_or_public === "public" || !conversations.private[room_tag]){
            return;
        }

        let {user_seen_last_msg} = this.context.Request_URLs;

        let body = {
            conversation_id: room_tag,
            user_id: owner_user_account.id
        };

        let result = await(await fetch(
            user_seen_last_msg,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        )).json();

        if(!result){
            alert("Something went wrong with updating seen by");
            return;
        }

        this.msg_socket?.emit('update_seen_by', {room_tag, seen_by: body.user_id});
    }

    Clear_Seen_By = async (room_tag, from_id)=>{

        //Only apply to private conversations
        if(!room_tag || this.state.private_or_public === "public"){
            return;
        }

        let {clear_seen_by} = this.context.Request_URLs;

        let body = {
            conversation_id: room_tag
        };

        let result = await(await fetch(
            clear_seen_by,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        )).json();

        if(!result){
            alert("Something went wrong with updating clear seen by");
        }

        this.msg_socket?.emit('clear_seen_by', {room_tag: room_tag, signal_sent_by: from_id});
    }

    Initialize_Public_Channel = async (channel_name, channel_description)=>{

        let {create_public_channel} = this.context.Request_URLs;

        let {id: user_id} = this.state.owner_user_account;

        let body = {
            channel_name,
            channel_description,
            user_id
        };

        let result = await(await fetch(
            create_public_channel,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        if(!result){
            alert("Something went wrong initializing public channel");
            return null;
        }

    }

    Join_Favorite_Public_Channels = async ()=>{

        let {get_favorite_public_channels} = this.context.Request_URLs;

        let {id: user_id} = this.state.owner_user_account;
        
        let body = {
            user_id
        };

        let data = await( await fetch(get_favorite_public_channels,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();

        if(!data || !data.channels){
            return;
        }
        
        this.Join_Public_Channels(data.channels);

    }

    Join_Public_Channels = (public_channels)=>{

        let {owner_user_account, conversations} = this.state;

        this.msg_socket?.emit('join_public_channels', {public_channels, user_data: owner_user_account});

        for(let channel of public_channels){

            let {channel_name} = channel;

            channel.messages = [];

            conversations.public[channel_name] = channel;

            this.All_Room_Tags.public[channel_name] = channel_name;
        }

        this.setState({conversations});

    }

    Update_Public_Channels_Database = async (public_channel_id, leave = false)=>{

        let {id: user_id} = this.state.owner_user_account;

        let {join_public_channel, leave_public_channel} = this.context.Request_URLs;

        let body = {
            user_id,
            public_channel_id
        };

        let result = await(await fetch(
            leave ? leave_public_channel : join_public_channel,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        if(!result){
            alert("Something wrong joining public channel");
            return;
        }

    }

    Leave_Public_Channel = (channel_name)=>{

        let {conversations, owner_user_account} = this.state;

        let channel_obj = conversations.public[channel_name];

        if(!channel_obj){
            alert("Invalid public channel selected");
            return;
        }

        this.msg_socket?.emit('leave_public_channel', {channel_obj, user_id: owner_user_account.id});

        delete this.All_Room_Tags.public[channel_name];

        delete conversations.public[channel_name];

        this.setState({conversations});

        this.Update_Public_Channels_Database(channel_obj.public_channel_id, true);

    }

    Update_Profile = async (owner_user_account)=>{

        let {update_profile} = this.context.Request_URLs;

        let result = await(await fetch(
            update_profile,
            {
                method: "POST",
                body: JSON.stringify(owner_user_account),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        this.setState({owner_user_account});
    }

    Set_Current_Users_Info = (room_tag, users_info)=>{

        let {current_users_info} = this.state;

        current_users_info[room_tag] = users_info;

        this.setState({current_users_info});
    }



    render(){

        let {following, 
            owner_user_account, 
            msg_socket, 
            conversations, 
            selected_room_tag, 
            public_channels_search_results, 
            selected_users, 
            private_or_public, 
            current_users_info} = this.state;

        return (
            <div id="messaging">

                <div id="top-section">

                    <div id="channel-selections-wrapper">

                        <Channel_Selections 
                            following_list={following} 
                            owner_user_account={owner_user_account}
                            switch_channel={this.Switch_Channel}
                            join_public_channels={this.Join_Public_Channels}
                            initialize_public_channel={this.Initialize_Public_Channel}
                            update_public_channels_database={this.Update_Public_Channels_Database}
                            join_favorite_public_channels={this.Join_Favorite_Public_Channels}
                            public_channels={conversations.public}
                            selected_channel={conversations.public[selected_room_tag]?.channel_name || "connections"}
                            set_msg_area_user_info={this.Set_Current_Users_Info}
                            msg_socket={msg_socket}
                            public_channels_search_results={public_channels_search_results}
                        />

                    </div>

                    <div id="online-users-wrapper">

                        <Users
                            visible_users={this.state.visible_users}
                            owner_user_account={this.state.owner_user_account}
                            refresh_conversation_list={this.Refresh_Conversation_List}
                            selected_users={this.state.selected_users}
                            select_user={this.Select_User}
                        />

                    </div>

                </div>

                <div id="bottom-section">

                    <div id="message-area-wrapper">

                        <Message_Area 
                            following_list={following} 
                            owner_user_account={owner_user_account}
                            conversations={conversations}
                            selected_room_tag={selected_room_tag}
                            switch_conversation={this.Switch_Conversation}
                            send_message={this.Send_Message}
                            selected_users={selected_users}
                            refresh_conversation_list={this.Refresh_Conversation_List}
                            clear_selected_users={this.Clear_Selected_Users}
                            leave_private_channel={this.Leave_Private_Channel}
                            clear_seen_by={this.Clear_Seen_By}
                            seen_by={this.Seen_By}
                            add_msg_to_conversation={this.Add_Msg_To_Conversation}
                            private_or_public={private_or_public}
                            current_users_info={current_users_info}
                            leave_public_channel={this.Leave_Public_Channel}
                            get_private_conversation_messages={this.Get_Private_Conversation_Messages}
                        />

                    </div>


                </div>
                

                
            </div>
        );
    }
}

export default Messaging;
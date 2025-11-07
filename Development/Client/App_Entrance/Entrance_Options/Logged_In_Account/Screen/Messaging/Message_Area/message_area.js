import React, {Component} from 'react';
import Conversation_Thumbnail from './Conversation_Thumbnail/conversation_thumbnail.js';
import Conversation_Input from './Conversation_Input/conversation_input.js';
import Conversation_Texts from './Conversation_Texts/conversation_texts.js';
import './message_area.less';

class Message_Area extends Component {

    constructor(props){
        
        super(props);

        Message_Area.contextType = window.Context;

        this.state = {
            private_conversations: this.props.private_conversations,
            private_or_public: "public",
            account_data: this.props.account_data,
            connection_list: this.props.connection_list,
            selected_room_tag: "",
            selected_users: this.props.selected_users, //Selected users for any purpose, (example: add selected users to a conversation)
            current_users_info: {} //Current user information that are currently in the chat room
        };  
    }

    componentDidMount(){


    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
        
    }

    Set_Current_Users_Info = (room_tag, users_info)=>{

        let {current_users_info} = this.state;

        current_users_info[room_tag] = users_info;

        //console.log("updating current users info");

        this.setState({current_users_info});
    }

    Has_Selected_Conversation = ()=>{

        return this.state.selected_room_tag ? true : false;
    }

    Leave_Conversation = async ()=>{

        let {private_conversations, selected_room_tag, account_data} = this.state;

        let selected_conversation = private_conversations[selected_room_tag];

        if(!selected_conversation){
            alert("Invalid conversation selected");
            return;
        }

        let {users} = selected_conversation;

        users = typeof users === "string" ? JSON.parse(users) : users || [];

        selected_conversation.users = users.filter((value)=>{ return value.email !== account_data.email; });

        await this.Update_Conversation(selected_conversation);

        this.props.leave_channel(selected_room_tag, selected_conversation.users);
        
    }

    Select_Button = (selection) => {

        this.setState({private_or_public: selection});

        this.props.set_public_private(selection);

    }

    Add_Users_To_Conversation = async (room_tag)=>{

        let selected_users_email = Object.keys(this.state.selected_users);

        if(selected_users_email.length === 0){
            alert("Select at least 1 user to add to the conversation");
            return;
        }

        let conversation = this.state.private_conversations[room_tag];

        if(!conversation){
            console.log("Conversation not found!");
            return;
        }

        let {users} = conversation;

        let time_joined = Date.now();

        let join_status = "pending";

        for(let email of selected_users_email){

            //Check see if the user email is already added
            if(users.some((user)=>{ return user.email === email})){
                alert("user already exists");
                continue;
            }

            users.push({email, time_joined, join_status});
            
        }

        await this.Update_Conversation(conversation);

        this.props.clear_selected_users();

        this.props.refresh_conversation_list(users);
    }

    Update_Conversation = async (conversation)=>{

        let {users, messages, room_tag, seen_by} = conversation;

        let body = {
            messages,
            room_tag,
            users,
            seen_by
        };

        let {update_conversation} = this.context.Request_URLs;

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

    render(){

        let {private_conversations, selected_room_tag} = this.state;

        let private_conversation = private_conversations[selected_room_tag];

        let user_status = private_conversation?.users?.find((u)=>{ return u.email === this.state.account_data.email; });

        return (
                <div id="message-area">

                    <div id="left-message-area" onClick={(e)=>{this.props.seen_by(null); }}>

                        <div id="top-left-message-area">

                            <div id="public-messages-button" 
                                className={`msg-type-button ${this.state.private_or_public === "public" ? "selected" : ""}`}
                                onClick={(e)=>{this.Select_Button("public"); }}
                            >

                                Public

                            </div>

                            <div id="private-messages-button" 
                                className={`msg-type-button ${this.state.private_or_public === "private" ? "selected" : ""}`}
                                onClick={(e)=>{this.Select_Button("private"); }}
                            >

                                Private

                            </div>

                        </div>

                        <div id="bottom-left-message-area">

                            <div id="conversation-texts-wrapper">

                                <Conversation_Texts conversation={private_conversation} 
                                                    my_account={this.state.account_data}
                                                    user_status={user_status}
                                                    current_users_info={this.state.current_users_info[private_conversation?.room_tag]}
                                    />

                            </div>

                            <div id="conversation-input-wrapper">

                                <Conversation_Input 
                                    send_msg={this.props.send_message}
                                    has_selected_conversation={this.Has_Selected_Conversation}
                                    leave_conversation={this.Leave_Conversation}
                                />

                            </div>

                        </div>

                    </div>

                    <div id="right-message-area">

                        <div id="top-right-message-area">

                            Conversations
    
                        </div>

                        <div id="bottom-right-message-area">

                            <div id="list-of-conversations">

                                {Object.keys(this.state.private_conversations).map((key, index)=>{

                                    let value = this.state.private_conversations[key];

                                    return <div className={`conversation-thumbnail-wrapper`}
                                                key={value.room_tag}>

                                        <Conversation_Thumbnail 
                                            conversation_info={value} 
                                            connection_list={this.state.connection_list}
                                            account_data={this.state.account_data}
                                            switch_conversation={this.props.switch_conversation}
                                            selected_room_tag={this.state.selected_room_tag}
                                            add_users_to_conversation={this.Add_Users_To_Conversation}
                                            set_current_users_info={this.Set_Current_Users_Info}
                                            seen_by={this.props.seen_by}
                                            user_status={user_status}
                                            update_conversation={this.Update_Conversation}
                                            refresh_conversation_list={this.props.refresh_conversation_list}
                                        />

                                    </div>;

                                })}

                            </div>

                        </div>

                    </div>
                    
                </div>
            );
        }
}

export default Message_Area;
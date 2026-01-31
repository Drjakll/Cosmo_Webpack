import React, {Component} from 'react';
import Conversation_Thumbnail from './Conversation_Thumbnail/conversation_thumbnail.js';
import Conversation_Input from './Conversation_Input/conversation_input.js';
import Conversation_Texts from './Conversation_Texts/conversation_texts.js';
import './message_area.less';

class Message_Area extends Component {

    constructor(props){
        
        super(props);

        Message_Area.contextType = window.Context;

        let {conversations, private_or_public, owner_user_account, following_list, selected_room_tag, selected_users, current_users_info} = props;

        this.state = {
            conversations,
            private_or_public,
            owner_user_account,
            following_list,
            selected_room_tag,
            selected_users, //Selected users for any purpose, (example: add selected users to a conversation)
            current_users_info //Current user information that are currently in the chat room
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

        this.setState({current_users_info});
    }

    Has_Selected_Conversation = ()=>{

        let {selected_room_tag} = this.state;

        return selected_room_tag !== null && selected_room_tag !== "connections" ? true : false;
    }

    Leave_Private_Conversation = async ()=>{

        let {conversations, selected_room_tag, owner_user_account} = this.state;

        let selected_conversation = conversations.private[selected_room_tag];

        if(!selected_conversation){
            alert("Invalid conversation selected");
            return;
        }

        let {users} = selected_conversation;

        selected_conversation.users = users.filter((value)=>{ return value.id !== owner_user_account.id; });

        this.props.leave_private_channel(selected_room_tag, selected_conversation.users);
        
    }

    Leave_Public_Conversation = async ()=>{

        let {conversations, selected_room_tag} = this.state;

        let selected_conversation = conversations.public[selected_room_tag];
        
        if(!selected_conversation){
            alert("Invalid conversation selected");
            return;
        }           

        this.props.leave_public_channel(selected_room_tag);

    }

    Select_Button = (selection) => {

        this.props.switch_conversation(selection, "");

    }

    Add_Users_To_Conversation = async (room_tag)=>{

        let selected_users_id = Object.keys(this.state.selected_users);

        if(selected_users_id.length === 0){
            alert("Select at least 1 user to add to the conversation");
            return;
        }

        let conversation = this.state.conversations.private[room_tag];

        if(!conversation){
            console.log("Conversation not found!");
            return;
        }

        let {users} = conversation;

        let new_users = [];

        for(let id of selected_users_id){

            //Check see if the user email is already added
            if(users.some((user)=>{ return user.user_id === id})){
                alert("user already exists");
                continue;
            }

            new_users.push({user_id: id, conversation_id: room_tag, seen_last: false});
            
        }

        await this.Update_Conversation_Participants(selected_users_id, room_tag);

        this.props.clear_selected_users();

        this.props.refresh_conversation_list(new_users.concat(users));
    }

    Update_Conversation_Participants = async (new_users, conversation_id)=>{

        if(new_users.length === 0){
            return;
        }

        let {add_conversation_participants} = this.context.Request_URLs;

        let result = (await fetch(
            add_conversation_participants,
            {
                method: "POST",
                body: JSON.stringify({new_users, conversation_id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        if(!result){
            alert("Something wrong add participants to conversation");
        }

    }

    render(){

        let {conversations, selected_room_tag, private_or_public} = this.state;

        let conversation = conversations[private_or_public][selected_room_tag];

        //User status contains the time when this user joined the private conversation, used to prevent from reading old conversation before he was invited
        let user_status = conversation?.users?.find((u)=>{ return u.id === this.state.owner_user_account.id; });

        return (
                <div id="message-area">

                    <div id="left-message-area" onClick={(e)=>{this.props.seen_by(selected_room_tag); }}>

                        <div id="top-left-message-area">

                            <div id="public-messages-button" 
                                className={`msg-type-button ${this.state.private_or_public === "public" ? "selected" : ""}`}
                            >

                                Public

                            </div>

                            <div id="private-messages-button" 
                                className={`msg-type-button ${this.state.private_or_public === "private" ? "selected" : ""}`}
                            >

                                Private

                            </div>

                        </div>

                        <div id="bottom-left-message-area">

                            <div id="conversation-texts-wrapper">

                                <Conversation_Texts conversation={conversation} 
                                                    my_account={this.state.owner_user_account}
                                                    user_status={user_status}
                                                    //public conversation have the object channel_name, while private conversation have the object room_tag
                                                    current_users_info={this.state.current_users_info[conversation?.room_tag || conversation?.channel_name]} 
                                                    has_selected_conversation={this.Has_Selected_Conversation}
                                                    get_private_conversation_messages={this.props.get_private_conversation_messages}
                                    />

                            </div>

                            <div id="conversation-input-wrapper">

                                <Conversation_Input 
                                    send_msg={this.props.send_message}
                                    has_selected_conversation={this.Has_Selected_Conversation}
                                    leave_conversation={private_or_public === "private" ? this.Leave_Private_Conversation : this.Leave_Public_Conversation}
                                />

                            </div>

                        </div>

                    </div>

                    <div id="right-message-area">

                        <div id="top-right-message-area">

                            Private Conversations
    
                        </div>

                        <div id="bottom-right-message-area">

                            <div id="list-of-conversations">

                                {Object.keys(this.state.conversations.private).map((key, index)=>{

                                    let value = this.state.conversations.private[key];

                                    return <div className={`conversation-thumbnail-wrapper`}
                                                key={key}>

                                        <Conversation_Thumbnail 
                                            conversation_info={value} 
                                            owner_user_account={this.state.owner_user_account}
                                            switch_conversation={this.props.switch_conversation}
                                            selected_room_tag={this.state.selected_room_tag}
                                            add_users_to_conversation={this.Add_Users_To_Conversation}
                                            set_current_users_info={this.Set_Current_Users_Info}
                                            seen_by={this.props.seen_by}
                                            user_status={user_status}
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
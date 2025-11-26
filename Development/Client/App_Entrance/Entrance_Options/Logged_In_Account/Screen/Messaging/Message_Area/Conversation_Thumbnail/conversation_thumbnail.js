import React, {Component} from 'react';
import './conversation_thumbnail.less';

class Conversation_Thumbnail extends Component {

    constructor(props){

        super(props);

        Conversation_Thumbnail.contextType = window.Context;

        let {connection_list, owner_user_account, conversation_info, selected_room_tag, user_status} = props;

        this.state = {
            connection_list,
            owner_user_account,
            conversation_info,
            users_info: {},
            selected_room_tag,
            user_status
        };
    }

    async componentDidMount(){

        let {conversation_info} = this.state;

        let users_info = await this.Gather_User_Info(conversation_info.users);

        this.props.set_current_users_info(conversation_info.room_tag, users_info);

    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

        let {conversation_info} = this.props;

        await this.Gather_User_Info(conversation_info.users);

    }

    Gather_User_Info = async (current_users_info)=>{


        //In case of a json string instead of a pure json/array object
        current_users_info = typeof current_users_info === 'string' ? JSON.parse(current_users_info || '[]') : current_users_info || [];

        if(!current_users_info){
            return;
        }

        let {users_info} = this.state;

        let {connection_list} = this.state;

        for(let user of current_users_info){

            //Check to see if it's in the connection list
            let temp = connection_list[user.email];
            
            //Else gather the user information
            temp = temp || await this.Get_Other_User_Info(user.email);

            users_info[user.email] = temp;
        }

        await this.setState({
            users_info
        });

        return users_info;
    }

    Get_Other_User_Info = async (email)=>{
        
        let {find_connections} = this.context.Request_URLs;

        let requirements = [    
            {
                type:"string",
                value: email,
                key: "email",
                conjunc: "=",
                logical: "and"
            }
        ];

        let data = await( await fetch(
            find_connections,
            {
                method: "POST",
                body: JSON.stringify({requirements: requirements}),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();

        return data?.result[0];
    }

    Create_Small_User_Icon = (user_info, index, is_online)=>{

        if(!user_info){
            return "";
        }

        let {aws_s3_url} = this.context.Request_URLs;

        let {profile_picture_link, first_name, last_name} = user_info;

        return <div className="user-info-small-icon" key={index}>

            <div id="user-small-profile-picture">
                <img src={`${aws_s3_url}${profile_picture_link}`} />
            </div>

            <div id="is-online" className={is_online || this.state.owner_user_account.email === user_info.email ? "online" : "offline"}>

            </div>

            <div id="user-profile-nametag">

                <pre>{first_name} {last_name}</pre>

            </div>

        </div>;

    }

    render(){

        let {seen_by, room_tag, online_users} = this.state.conversation_info || {};

        return <div id="conversation-thumbnail" onClick={(e)=>{
   
                this.props.switch_conversation("private", room_tag);

                this.props.seen_by(room_tag);
                
            }}

            className={`${this.state.conversation_info.room_tag === this.state.selected_room_tag ? "selected-tag" : ""}`}
        >

            {(seen_by || {})[this.state.owner_user_account.email] ? "" : <div id="attention-mark">!</div>}

            <div id="small-user-icons-wrapper">

                {Object.keys(this.state.users_info).reverse().map((email, key)=>{

                    let user_info = this.state.users_info[email];

                    let is_online = online_users[email] ? true : false;

                    return this.Create_Small_User_Icon(user_info, key, is_online);

                })}

                <div id="add-participant-button" onClick={(e)=>{

                    this.props.add_users_to_conversation(this.state.conversation_info.room_tag);
                    
                }}>
                    +
                </div>

            </div>

        </div>;
    }
}

export default Conversation_Thumbnail;
import React, {Component} from 'react';
import './conversation_thumbnail.less';

class Conversation_Thumbnail extends Component {

    constructor(props){

        super(props);

        Conversation_Thumbnail.contextType = window.Context;

        let { owner_user_account, conversation_info, selected_room_tag, user_status} = props;

        this.state = {
            owner_user_account,
            conversation_info,
            selected_room_tag,
            user_status
        };
    }

    async componentDidMount(){


    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

    }

    Create_Small_User_Icon = (user_info, index, is_online)=>{

        if(!user_info){
            return "";
        }

        let {aws_s3_url} = this.context.Request_URLs;

        let {profile_picture_link, first_name, last_name, seen_last} = user_info;

        let profile_photo = profile_picture_link ? `${aws_s3_url}${profile_picture_link}` : './static/pp_placeholder.png';

        return <div className="user-info-small-icon" key={index}>

            <div id="user-small-profile-picture">
                <img src={profile_photo} />
            </div>

            <div id="is-online" className={is_online || this.state.owner_user_account.id === user_info.id ? "online" : "offline"}>

            </div>

            { seen_last ? "" : <div id="attention-mark">!</div>}

            <div id="user-profile-nametag">

                <pre>{first_name} {last_name}</pre>

            </div>

        </div>;

    }

    render(){

        let { id, online_users, users} = this.state.conversation_info || {};

        return <div id="conversation-thumbnail" onClick={(e)=>{
   
                this.props.switch_conversation("private", id);

                this.props.seen_by(id);
                
            }}

            className={`${this.state.conversation_info.id === this.state.selected_room_tag ? "selected-tag" : ""}`}
        >

            <div id="small-user-icons-wrapper">

                {users.map((value, key)=>{
                    
                    let {user_id: id} = value;

                    let is_online = online_users[id] ? true : false;

                    return this.Create_Small_User_Icon(value, id, is_online);

                })}

                <div id="add-participant-button" onClick={(e)=>{

                    this.props.add_users_to_conversation(this.state.conversation_info.id);
                    
                }}>
                    +
                </div>

            </div>

        </div>;
    }
}

export default Conversation_Thumbnail;
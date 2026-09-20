import React, { Component } from 'react';
import './online_users.less';
import Profile_Thumbnail from '@profile_thumbnail';


class Online_Users extends Component {

    constructor(props) {

        super(props);

        let {owner_user_account, followings, followers, online_followings, streaming_id} = this.props;

        this.state = {
            followers,
            followings,
            online_followings,
            owner_user_account,
            streaming_id //If user is currently in a stream, this value will not be null
        };

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

    }

    Join_Stream = (room_tag)=>{

        const Control_Stream_Component = (stream_ref) => {

            let {stream_id, stream_title} = room_tag;

            stream_ref.Set_Current_Screen("Video_Stream_Screen", false, stream_id, stream_title);

        }

        let {change_view} = this.props;

        change_view(5);

        setTimeout(()=>{
            change_view(1, Control_Stream_Component);
        }, 250);
    }

    Generate_Streaming_Buttons = (room_tag)=>{

        let {stream_title, is_host, stream_id: this_stream_id} = room_tag;
        let {streaming_id: current_stream_id} = this.state;

        return <div id = "join-another-stream-option-buttons">

            <div id="streaming-label">
                {is_host ? "Hosting" : "In"} a stream..

                <div id="stream-information">

                    {stream_title} 

                </div>

            </div>

            { this_stream_id === current_stream_id ? 

                "" :

                <div id="join-stream-button-wrapper">

                    <div id="join-stream-button" onClick={
                        (e)=>{ 

                            this.Join_Stream(room_tag); 

                        }
                    }>
                        Join
                    </div>

                </div>
            }
            
        </div>
    }

    Generate_Streaming_Options = (room_tag)=>{

        return <div id="streaming-option-wrappers">

            {!room_tag ? "" : this.Generate_Streaming_Buttons(room_tag)}

        </div>

    }

    render() {

        let {online_followings, followings, owner_user_account} = this.state;

        return <div id="online-users">

            <div id="online-users-label">

                {Object.keys(online_followings).length}/{followings.length} Users Online 

            </div>

            <div id="online-users-list">

                {Object.entries(online_followings).map(([key,value])=>{

                    let {first_name, last_name, room_tag} = value;

                    return <div key={key} className="online-user-entry">

                        <div id="profile-thumbnail-wrapper">

                            <Profile_Thumbnail 
                                profile={value}
                                owner_user_account={owner_user_account}
                                visitor_user_account={owner_user_account}
                                generate_options_disabled={true}
                            />

                        </div>

                        <div id="online-profile-status">

                            <div id="name-tag">

                                {first_name} {last_name}

                            </div>

                            <div id="status">

                                <div id="greendot-wrapper">
                                    <div id="green-dot"></div>
                                </div> 

                                <label id="online-label">Online</label> 

                                {this.Generate_Streaming_Options(room_tag)}
                                
                            </div>

                            

                        </div>

                    </div>;
                })}

            </div>

        </div>;
    }
}

export default Online_Users;
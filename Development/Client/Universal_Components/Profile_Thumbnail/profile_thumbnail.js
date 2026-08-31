import React, { Component } from 'react';
import Profile_Popup from '@profile_popup';
import Request_URLs from '@request_urls';
import popup_message from '@popup_message';
import {Refresh} from '@get_follows';
import './profile_thumbnail.less';

class Profile_Thumbnail extends Component {

    constructor(props){

        super(props);

        let {profile: this_profile, 
                owner_user_account, 
                visitor_user_account, 
                rounded_portrait, 
                additional_options, 
                visitor_all_following_status} = this.props;

        let options = [
            {
                label: "View Profile",
                onclick_callback: this.Trigger_Profile_Popup
            },
            {
                label: "Block User",
                onclick_callback: this.Block_User
            },
            {
                label: "Follow User",
                onclick_callback: this.Request_Follow
            }
        ];

        options = options.concat(additional_options ?? []);

        this.state = {
            this_profile,
            owner_user_account,
            visitor_user_account,
            show_popup: false,
            rounded_portrait: rounded_portrait || false,
            options,
            existing_blocked_information: {
                features: ""
            },
            following_status: visitor_all_following_status?.find((user)=>{ return user.followed_id === this_profile.id; }),
            visitor_all_following_status
        };
    }

    componentDidMount(){

    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        let following_status = this.props.visitor_all_following_status?.find((user)=>
            { 
                return user.followed_id === this.props.profile.id;
            });

        await this.setState(this.props);
        this.setState({following_status});
    }   

    View_Popup_Profile = ()=>{

        let {show_popup} = this.state;

        let {this_profile, owner_user_account, visitor_user_account, visitor_all_following_status} = this.state;

        return show_popup ?                
            
            <Profile_Popup 
                this_profile_data={this_profile}
                owner_user_account={owner_user_account} 
                visitor_user_account={visitor_user_account} 
                visitor_all_following_status={visitor_all_following_status}
                Exit={this.Exit_Popup}/>  
                
                :
                
                "";
    }

    Exit_Popup = ()=>{

        this.setState({show_popup: false})
    }

    Trigger_Profile_Popup = async () => {

        await this.setState({show_popup: true});

    }

    Request_Follow = async ({user_info})=>{

        let {send_follow_request} = Request_URLs;
        
        let {visitor_user_account} = this.state;


        if(user_info.id === visitor_user_account.id){
            
            await popup_message("message", "You cannot follow yourself", null);
            return;
        }

        let body = {
            from_id: visitor_user_account.id,
            to_account_info: {
                id: user_info.id,
                privacy: user_info.privacy
            }
        };

        let data = await(await fetch(send_follow_request,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json(); 

        //Refresh the followings list
        await this.Refresh_List(false, user_info.id !== visitor_user_account.id);

        window.global_connection_socket.emit("refresh_connection_list", {user_id: user_info.id});
        window.global_connection_socket.emit("refresh_connection_list", {user_id: visitor_user_account.id});

        window.global_connection_socket.emit("refresh_alerts", {user_id: user_info.id});
        
        popup_message("message", data?.message, null);
    }

    Refresh_List = async (refresh_followers = true, is_visiting = false) => {
    
        let {owner_user_account} = this.state;

        await Refresh(refresh_followers, is_visiting, owner_user_account);
    }

    Generate_Options = () =>{

        let {this_profile, options, following_status, visitor_user_account} = this.state;

        let {id: visitor_user_id} = visitor_user_account;
        let {id: this_profile_id} = this_profile;

        return <div id="profile-thumbnail-options-wrapper" className={`popup`}>

            {options.map((value, index)=>{

                let {label, onclick_callback} = value;

                const not_show = (following_status?.status === "accepted" 
                                    || visitor_user_id === this_profile_id) 
                                    && label === "Follow User";

                label = label === "Follow User" && following_status?.status === "pending" ? "Withdraw Request" : label;

                return !not_show ? <div className="profile-thumbnail-option-selection"
                            key={index}
                            onClick={async (e)=>{

                                await onclick_callback({user_info: this_profile});

                            }}>

                                {label}

                    </div> : "";

            })}

        </div>

    }
    
    //Features that can be block target users from
    block_features = [
        {
            value: "wall",
            label: "Wall",
            selected: false
        },
        {
            value: "photos",
            label: "Photos",
            selected: false
        },
        {
            value: "private_messages",
            label: "Private Message Invites",
            selected: false
        },
        {
            value: "posts",
            label: "Posts",
            selected: false
        },
        {
            value: "profile_view",
            label: "Profile View",
            selected: false
        }
    ];

    Is_User_Blocked = async ()=>{

        let {owner_user_account, this_profile} = this.state;

        let {id: viewer_id} = owner_user_account;
        let {id: target_id} = this_profile;

        let {is_user_blocked} = Request_URLs;

        let body = {
            viewer_id,
            target_id
        }

        let data = await(await fetch(is_user_blocked, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': "application/json"
            }
        })).json();

        if(data?.blocked === true){
            await popup_message("message", data.message);
            return true;
        }

        return false;

    }

    Block_User = async ({user_info}) => {

        let {owner_user_account, visitor_user_account} = this.state;

        if(owner_user_account.id === user_info.id || visitor_user_account.id === user_info.id){
            popup_message('message', "You cannot block yourself");
            return;
        }

        await this.Get_Target_Blocked_Info();

        let result = {};

        let {existing_blocked_information} = this.state;

        //Making a copy so that it doesn't reference to the original block_features
        let block_features = JSON.parse(JSON.stringify(this.block_features))

        let existing_blocked_features = existing_blocked_information?.features?.split(',') ?? [];


        existing_blocked_features = block_features.map((feature, i)=>{

            let {value} = feature;

            if(existing_blocked_features.includes(value)){
                feature.selected = true;
            }

            return feature;

        });
        

        await popup_message("selections", "Select the features that the user is blocked from...", result, existing_blocked_features);

        if(result.input === null){
            return;
        }

        const blocked_features = result.input;

        await popup_message("input", "A reminder to yourself to what was the reason for the block..?", result);

        if(result.input === null){
            return;
        }

        const reason = result.input;

        let {block_user} = Request_URLs;

        let req_data = {
            user_id: owner_user_account.id,
            target_id: user_info.id,
            blocked_features,
            reason
        };

        let res = await fetch(block_user, {
            method: "POST",
            body: JSON.stringify(req_data),
            headers: {
                'Content-Type': "application/json"
            }
        });

        let res_data = await res.json();

        if(!res_data){
            await popup_message('message', "Error while blocking target user");
            return;
        }

        popup_message('message', res_data.message);

    }

    Get_Target_Blocked_Info = async ()=>{

        let {existing_blocked_information, this_profile, owner_user_account} = this.state;

        const {id: target_id} = this_profile;

        const {id: user_id} = owner_user_account;

        const {get_blocked_users} = Request_URLs;

        let body = {
            user_id,
            target_id
        };

        let data = await(await fetch(
            get_blocked_users, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();

        if(!data){
            popup_message("message", "Error while making the request to retrieve target blocked information");
            return;
        }

        if(!data.blocked_users.length){
            return;
        }

        let {blocked_features} = data.blocked_users[0];

        existing_blocked_information.features = blocked_features;

        await this.setState({existing_blocked_information});
    }

    render(){

        let {aws_s3_url} = Request_URLs;

        const {generate_options_disabled} = this.props;

        let {this_profile, rounded_portrait} = this.state;

        let {profile_picture_link } = this_profile;

        let full_pp_link = `${aws_s3_url}${profile_picture_link}`;

        let placeholder = `./static/pp_placeholder.webp`;

        return <div className="profile-thumbnail-wrapper">

            {this.View_Popup_Profile()}

            <div id="profile-thumbnail-image-wrapper">

                <img id="profile-thumbnail-image" 
                    src={profile_picture_link ? full_pp_link : placeholder} 
                    alt="Profile Thumbnail"
                    style={{ borderRadius: rounded_portrait === true ? "50px" : "" }}
                    onClick={this.Trigger_Profile_Popup}
                    draggable={false}
                />

            </div>

            {generate_options_disabled ? "" :
                <div id="option-wrapper">

                    <div id="profile-thumbnail-dropdown-icon">...</div>

                    {this.Generate_Options()}

                </div>
            }
        </div>;
    }
}

export default Profile_Thumbnail;
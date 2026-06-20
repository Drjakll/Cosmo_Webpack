import React, {Component} from 'react';
import Context  from '@context/context.js';
import Follow_List from './Follow_List/follow_list.js';
import Popup_Msg from '@popup_template/Popup_Message/popup_message.js';
import {Get_Follows, Queue_Set_State, Refresh} from '@universal_components/Account_Functions/get_follows.js';
import { io } from 'socket.io-client';
import './connections.less';

class Connections extends Component {

    static contextType = Context;

    List = Follow_List

    constructor(props){

        super(props);

        let {owner_user_account, visitor_user_account} = props;
        
        this.Setup_Socket();

        this.state = {
            owner_user_account,
            visitor_user_account,
            followings: [],
            followers: [],
            follow_req_status: null
        };
    }

    async componentDidMount(){

        let {owner_user_account, visitor_user_account } = this.state;

        let is_visiting = owner_user_account.id !== visitor_user_account.id;

        Queue_Set_State(this.setState.bind(this), owner_user_account, "get_followers", "Connections", is_visiting);
        Queue_Set_State(this.setState.bind(this), owner_user_account, "get_followings", "Connections", is_visiting);

        
        await this.Update_Follow_Request_Status();

        //Refresh followers
        await Refresh(true, is_visiting);
        //Refresh followings
        await Refresh(false, is_visiting);
        
    }

    Update_Follow_Request_Status = async () => {

        let {visitor_user_account, owner_user_account} = this.state;

        let req_status = await this.Get_Request_Status(visitor_user_account.id, owner_user_account.id);
        
        this.setState({follow_req_status: req_status});
    }

    Setup_Socket = () =>{

        this.socket = io('/global_events');

    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        await this.setState(this.props);

    }

    Refresh_List = async (refresh_followers = true, is_visiting = false) => {

        await Refresh(refresh_followers, is_visiting);
    }

    Send_Follow_Request = async ()=>{

        let {send_follow_request} = this.context.Request_URLs;

        let {owner_user_account, visitor_user_account} = this.state;

        let body = {
            from_id: visitor_user_account.id,
            to_account_info: {
                id: owner_user_account.id,
                privacy: owner_user_account.privacy
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
        await this.Refresh_List(false, owner_user_account.id !== visitor_user_account.id);

        //Refresh the following account's followers list
        this.socket.emit("report_update_followers", {following_acc: owner_user_account});

        //Update the follower's account on following list
        this.socket.emit("report_update_followings", {follower_acc: visitor_user_account});

        await this.Update_Follow_Request_Status();
        
        //Popup_Msg("message", data?.message, null);
    }

    Show_Follow_Request_Button = ()=>{

        let {owner_user_account, follow_req_status} = this.state;

        let {privacy} = owner_user_account;

        return  <div id="request-to-follow-button" onClick={this.Send_Follow_Request}>

            {privacy === "private" || privacy === "mutual" ? (follow_req_status === "pending" ? "Remove follow request" : "Request to Follow") : "Follow"}

        </div>;
    }

    Get_Request_Status = async (from_id, to_id) => {

        let result = await (await fetch(`/get_request_status/${from_id}/${to_id}`, {
            method: "GET"})).json();

        return result.status;
    }

    Display_Followers_List = ()=>{

        let {owner_user_account, visitor_user_account, followers} = this.state;

        let {List} = this;

        return <div id="follower-list-display-wrapper">

            <List 
                owner_user_account={owner_user_account}
                visitor_user_account={visitor_user_account}
                label={"Followers"}
                followers={followers}
                Refresh_List={this.Refresh_List}
            />

        </div>;
    }

    Display_Following_List = ()=>{

        let {owner_user_account, visitor_user_account, followings} = this.state;

        let {List} = this;

        return <div id="following-list-display-wrapper">

            <List 
                owner_user_account={owner_user_account}
                visitor_user_account={visitor_user_account}
                label={"Following"}
                followings={followings}
                Refresh_List={this.Refresh_List}
            />

        </div>;
    }

    render(){

        let {visitor_user_account, owner_user_account, followers, followings} = this.state;


        let {id: follower_id} = visitor_user_account;

        return <div id="connections-bar">

            <div id="connection-types">

                <div id="followers-button" 

                    className="follow-button" 

                    onClick={(e)=>{ 
                        this.props.change_display(this.Display_Followers_List);
                    }}
                > 
                
                    <div id="follow-icon" style={{backgroundImage: `url(./static/followers_icon.png)`}}></div>

                    <label>{followers?.length} Followers</label>

                </div>

                <div id="following-button" 
                    
                    className="follow-button"
                    
                    onClick={(e)=>{
                        this.props.change_display(this.Display_Following_List);
                    }}
                >
                        
                    <div id="follow-icon" style={{backgroundImage: `url(./static/following_icon.png)`}}></div>

                    <label>{followings?.length} Following</label>
                        
                </div>

            </div>

            <div id="request-buttons">

                {visitor_user_account.id !== owner_user_account.id && !followers.some(u => u.id === follower_id) ? this.Show_Follow_Request_Button() : ""}

            </div>

        </div>;
    }
}

export default Connections;
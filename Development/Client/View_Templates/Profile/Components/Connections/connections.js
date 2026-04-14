import React, {Component} from 'react';
import Context  from '@context/context.js';
import Follow_List from './Follow_List/follow_list.js';
import Popup_Msg from '@popup_template/Popup_Message/popup_message.js';
import './connections.less';

class Connections extends Component {

    static contextType = Context;

    List = Follow_List

    constructor(props){

        super(props);

        let {owner_user_account, visitor_user_account} = props;

        this.state = {
            owner_user_account,
            visitor_user_account
        };
    }

    componentDidMount(){
        
    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        await this.setState(this.props);

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

        await window.Refresh_Login();

        let {Refresh_Profile_Data} = this.props;

        Refresh_Profile_Data && Refresh_Profile_Data();
        
        Popup_Msg("message", data?.message, null);
    }

    Show_Follow_Request_Button = ()=>{

        let {owner_user_account, visitor_user_account} = this.state;

        let {privacy, pending_follow_requests} = owner_user_account;

        let pending = pending_follow_requests?.includes(visitor_user_account.id);

        return  <div id="request-to-follow-button" onClick={this.Send_Follow_Request}>

            {privacy === "private" || privacy === "mutual" ? (pending ? "Remove follow request" : "Request to Follow") : "Follow"}

        </div>;
    }

    Display_Followers_List = ()=>{

        let {owner_user_account, visitor_user_account} = this.state;

        let {List} = this;

        return <div id="follower-list-display-wrapper">

            <List 
                owner_user_account={owner_user_account}
                visitor_user_account={visitor_user_account}
                label={"Followers"}
            />

        </div>;
    }

    Display_Following_List = ()=>{

        let {owner_user_account, visitor_user_account} = this.state;

        let {List} = this;

        return <div id="following-list-display-wrapper">

            <List 
                owner_user_account={owner_user_account}
                visitor_user_account={visitor_user_account}
                label={"Following"}
            />

        </div>;
    }

    render(){

        let {visitor_user_account, owner_user_account} = this.state;

        let {following_ids, follower_ids} = owner_user_account;

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

                    <label>{follower_ids?.length} Followers</label>

                </div>

                <div id="following-button" 
                    
                    className="follow-button"
                    
                    onClick={(e)=>{
                        this.props.change_display(this.Display_Following_List);
                    }}
                >
                        
                    <div id="follow-icon" style={{backgroundImage: `url(./static/following_icon.png)`}}></div>

                    <label>{following_ids?.length} Following</label>
                        
                </div>

            </div>

            <div id="request-buttons">

                {visitor_user_account.id !== owner_user_account.id && !follower_ids?.includes(follower_id) ? this.Show_Follow_Request_Button() : ""}

            </div>

        </div>;
    }
}

export default Connections;
import React, {Component} from 'react';
import Context  from '@context/context.js';
import Follow_List from './Follow_List/follow_list.js';
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

        await fetch(send_follow_request,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );  

        window.Refresh_Login();
    }

    Show_Follow_Request_Button = ()=>{

        let {owner_user_account} = this.state;

        let {privacy} = owner_user_account;

        return  <div id="request-to-follow-button" onClick={this.Send_Follow_Request}>

            {privacy === "private" ? "Request to Follow" : "Follow"}

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

        let {following_count, followers_count} = owner_user_account;

        let {follower_ids} = owner_user_account;
        let {id: follower_id} = visitor_user_account;

        return <div id="connections-bar">

            <div id="connection-types">

                <div id="followers-button" 

                    className="follow-button" 

                    onClick={(e)=>{ 
                        this.props.change_display(this.Display_Followers_List);
                    }}
                > 

                    {followers_count} Followers

                </div>

                <div id="following-button" 
                    
                    className="follow-button"
                    
                    onClick={(e)=>{
                        this.props.change_display(this.Display_Following_List);
                    }}
                >
                        
                    {following_count} Following
                        
                </div>

            </div>

            <div id="request-buttons">

                {visitor_user_account.id !== owner_user_account.id && !follower_ids?.includes(follower_id) ? this.Show_Follow_Request_Button() : ""}

            </div>

        </div>;
    }
}

export default Connections;
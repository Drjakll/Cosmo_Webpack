import React, {Component} from 'react';
import Context  from '@context/context.js';
import Following_List from './Following_List/following_list.js';
import Followers_List from './Followers_List/followers_list.js';
import './connections.less';

class Connections extends Component {

    static contextType = Context;

    Following = Following_List
    Followers = Followers_List

    constructor(props){

        super(props);

        let {owner_user_account, visitor_user_account} = props;

        this.state = {
            owner_user_account,
            visitor_user_account,
            followers: [],
            following: []
        };
    }

    componentDidMount(){

        this.Get_Connections();

    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        await this.setState(this.props);

    }

    Get_Connections = async ()=>{

        this.setState({
                        followers: await this.Get_All_Followers(),
                        following: await this.Get_All_Following()
                    });
    }

    Get_All_Followers = async ()=>{

        let {id} = this.state.owner_user_account;

        let {get_all_followers} = this.context.Request_URLs;

        let data = await(await fetch(
            get_all_followers,
            {
                method: "POST",
                body: JSON.stringify({id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        return data?.results ?? [];

    }

    Get_All_Following = async ()=>{

        let {id} = this.state.owner_user_account;

        let {get_all_followings} = this.context.Request_URLs;

        let data = await(await fetch(
            get_all_followings,
            {
                method: "POST",
                body: JSON.stringify({id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        return data?.results ?? [];

    }

    Show_Follow_Request_Button = ()=>{

        let {owner_user_account} = this.state;

        let {privacy} = owner_user_account;

        return  <div id="request-to-follow-button">

            {privacy === "private" ? "Request to Follow" : "Follow"}

        </div>;
    }

    Display_Followers_List = ()=>{

        let {owner_user_account, visitor_user_account, followers} = this.state;

        let {Followers} = this;

        return <div id="follower-list-display-wrapper">

            <Followers 
                owner_user_account={owner_user_account}
                visitor_user_account={visitor_user_account}
                list={followers}
            />

        </div>;
    }

    Display_Following_List = ()=>{

        let {owner_user_account, visitor_user_account, following} = this.state;

        let {Following} = this;

        return <div id="follower-list-display-wrapper">

            <Following 
                owner_user_account={owner_user_account}
                visitor_user_account={visitor_user_account}
                list={following}
            />

        </div>;
    }

    render(){

        let {followers, following, visitor_user_account, owner_user_account} = this.state;

        return <div id="connections-bar">

            <div id="connection-types">

                <div id="followers-button" 

                    className="follow-button" 

                    onClick={(e)=>{ 
                        this.props.change_display(this.Display_Followers_List);
                    }}
                > 

                    {followers.length} Followers

                </div>

                <div id="following-button" 
                    
                    className="follow-button"
                    
                    onClick={(e)=>{
                        this.props.change_display(this.Display_Following_List);
                    }}
                >
                        
                    {following.length} Following
                        
                </div>

            </div>

            <div id="request-buttons">

                {visitor_user_account.id !== owner_user_account.id ? this.Show_Follow_Request_Button() : ""}

            </div>

        </div>;
    }
}

export default Connections;
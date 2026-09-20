import React, { Component } from 'react';
import Account_Buttons from './Account_Buttons/account_buttons.js';
import Alert_Buttons from './Alert_Buttons/alert_buttons.js';
import Online_Users from './Online_Users/online_users.js';
import { Queue_Set_State, Refresh} from '@get_follows';
import init_websocket from '@init_websocket';
import Logo from '@logo';
import './upper_bar.less';

class Upper_Bar extends Component {

    constructor(props) {

        super(props);

        let {owner_user_account} = this.props;

        this.state = {
            owner_user_account,
            followings: [],
            followers: [],
            online_followings: {},
            streaming_id: null //If user is streaming, this value will change
        };

        //Add this setState function to let the Refresh callback to update whenever a new followers/followings is added or removed
        Queue_Set_State(this.setState.bind(this), owner_user_account, "get_followers", "Online_Users");
        Queue_Set_State(this.setState.bind(this), owner_user_account, "get_followings", "Online_Users");

        this.Setup_Socket();
    }
    
    componentDidMount() {
    
        window.addEventListener('visibilitychange', (e)=>{


            let {visibilityState} = document;

            let {owner_user_account: user_account, followers} = this.state;

            switch(visibilityState){
                case 'visible': 
                    this.Report_Online();
                    break;
                case 'hidden':
                    this.socket?.emit('report_offline', {user_account, followers})
                    break;
            }

        });

        window.addEventListener('pageshow', (e)=>{
            
            this.Setup_Socket();
            this.Report_Online();
        });

        window.addEventListener('pagehide', this.Handle_Offline);

    }

    componentDidUpdate(prevProps, prevState){

        if(this.state.followings === prevState.followings && this.state.followers === prevState.followers){
            return;
        }

        this.Report_Online();

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    Setup_Socket = () => {

        this.socket = init_websocket("/global_events", this.Setup_Socket, this.Handle_Offline);

        this.socket?.on("add_online_user", ({online_user}) => {

            let {online_followings } = this.state;

            let {id} = online_user;

            online_followings[id] = online_user;

            this.setState({online_followings});

        });

        this.socket?.on("who_is_online", ({online_users})=>{

            let online_followings = {};

            for(let user of online_users){

                let {id} = user;

                online_followings[id] = user;
            }

            this.setState({online_followings});
        });

        this.socket?.on("force_user_to_check_who_is_online", ()=>{

            let {followings, owner_user_account} = this.state;

            this.socket?.emit("who_is_online", ({user_account: owner_user_account, followings}))

        });

        this.socket?.on("remove_offline_user", ({offline_user_id: id})=>{

            let {online_followings} = this.state;

            delete online_followings[id];

            this.setState({online_followings});

        });

        this.socket?.on("followers_update", async ()=>{

            await Refresh(true);

        });

        this.socket?.on("followings_update", async ()=>{

            await Refresh(false);

        });

        this.socket?.on("report_streaming_status", ({room_tag, is_hosting, is_streaming})=>{

            //Receiving the streaming status from streaming.js through websocket
            let {followers} = this.state;

            if(is_streaming){

                this.socket?.emit("report_on_streaming", {room_tag, is_hosting, followers});

                this.setState({
                    streaming_id: room_tag.stream_id
                })

            } else {

                this.socket?.emit("report_off_streaming", {room_tag, is_hosting, followers}); 

                this.setState({
                    streaming_id: null
                })
            }

        });

        this.socket?.on("report_streaming_online_to_following", ({room_tag, user_id: id, is_hosting})=>{

            let {online_followings} = this.state;

            if(online_followings[id]){
                online_followings[id].room_tag = room_tag;
            }

            this.setState({online_followings});

        });

        this.socket?.on("report_streaming_offline_to_following", ({room_tag, user_id: id, is_hosting})=>{

            let {online_followings} = this.state;

            if(online_followings[id]){
                delete online_followings[id].room_tag;
            }

            this.setState({online_followings});

        });

        window.global_user_socket = this.socket;

    }

    Report_Online = () => {
        
        let {owner_user_account, followers, followings} = this.state;

        //Report to followers that you are online
        this.socket?.emit("report_online", {user_account: owner_user_account, followers});

        //Check all the followings to see who is online
        this.socket?.emit("who_is_online", {user_account: owner_user_account, followings});
    }

    componentWillUnmount(){

    }

    Handle_Offline = (e)=>{

        let {owner_user_account: user_account, followers} = this.state;

        this.socket?.emit('report_offline', {user_account, followers});
        this.socket?.disconnect();

    }

    render() {

        let {owner_user_account, followings, followers, online_followings, streaming_id} = this.state;

        let {change_view, Change_Screen} = this.props;

        return <div id="upper-bar">
            
            <div id="logo-wrapper" className="upper-butttons">

                <Logo style={
                        {
                            wrapper: {
                                padding: "5px 40px 5px 40px",
                                fontSize: "13px",
                                border: "rgba(0,0,0,0.5) solid 1px"
                            }, 
                            cos: {
                                fontSize: "1em"
                            }, 
                            mo: {
                                fontSize: "1em"
                            }
                        }
                    }
                />

            </div>

            <div id="online-users-wrapper" className="upper-buttons">

                <Online_Users 
                    owner_user_account={owner_user_account} 
                    followings={followings} 
                    followers={followers} 
                    online_followings={online_followings}
                    change_view={change_view}
                    streaming_id={streaming_id}
                />

            </div>

            <div id="alert-buttons-wrapper" className="upper-buttons">

                <Alert_Buttons owner_user_account={owner_user_account} />

            </div>

            <div id="account-buttons-wrapper" className="upper-buttons">

                <Account_Buttons 
                    account_data={owner_user_account} 
                    Change_Screen={Change_Screen}
                />

            </div>

        </div>;
    }
}

export default Upper_Bar;
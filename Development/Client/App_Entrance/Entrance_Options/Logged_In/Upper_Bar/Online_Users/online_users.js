import React, { Component } from 'react';
import './online_users.less';
import { Queue_Set_State, Refresh} from '@get_follows';
import Profile_Thumbnail from '@profile_thumbnail';
import init_websocket from '@init_websocket';

class Online_Users extends Component {

    constructor(props) {

        super(props);

        let {owner_user_account} = this.props;

        this.state = {
            followers: [],
            followings: [],
            online_followings: {},
            owner_user_account
        };

        //Add this setState function to let the Refresh callback to update whenever a new followers/followings is added or removed
        Queue_Set_State(this.setState.bind(this), owner_user_account, "get_followers", "Online_Users");
        Queue_Set_State(this.setState.bind(this), owner_user_account, "get_followings", "Online_Users");
    }

    componentWillUnmount(){
        
        this.Handle_Offline();
    }

    Handle_Offline = (e)=>{

        let {owner_user_account: user_account, followers} = this.state;

        this.socket?.emit('report_offline', {user_account, followers});
        this.socket?.disconnect();

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

        this.Setup_Socket();

    }

    componentDidUpdate(prevProps, prevState){

        if(this.state.followers === prevState.followers && this.state.followings === prevState.followings){
            return;
        }

        this.Report_Online();

        if(this.props === prevProps){
            return;
        }

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

        this.socket?.on("remove_offline_user", ({offline_user})=>{

            let {online_followings} = this.state;

            let {id} = offline_user;

            delete online_followings[id];

            this.setState({online_followings});

        });

        this.socket?.on("followers_update", async ()=>{

            await Refresh(true);

        });

        this.socket?.on("followings_update", async ()=>{

            await Refresh(false);

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

    render() {

        let {online_followings, followings, owner_user_account} = this.state;

        return <div id="online-users">

            <div id="online-users-label">

                {Object.keys(online_followings).length}/{followings.length} Users Online 

            </div>

            <div id="online-users-list">

                {Object.entries(online_followings).map(([key,value])=>{

                    let {first_name, last_name} = value;

                    console.log(key);

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

                                <div id="green-dot"></div> (Online)

                            </div>

                        </div>

                    </div>;
                })}

            </div>

        </div>;
    }
}

export default Online_Users;
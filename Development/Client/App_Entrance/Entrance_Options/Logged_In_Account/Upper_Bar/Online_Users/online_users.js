import React, { Component } from 'react';
import './online_users.less';
import { Queue_Set_State, Refresh} from '@universal_components/Account_Functions/get_follows.js';
import Profile_Thumbnail from '@universal_components/Profile_Thumbnail/profile_thumbnail.js';
import { io } from 'socket.io-client';

class Online_Users extends Component {

    constructor(props) {

        super(props);

        let {owner_user_account} = this.props;

        this.Setup_Socket();

        this.state = {
            followers: [],
            followings: [],
            online_followings: {},
            owner_user_account
        };
    }

    componentWillUnmount(){

        let {owner_user_account, followers} = this.state;

        this.socket.emit("report_offline", {user_account: owner_user_account, followers});
        
    }

    componentDidMount() {

        let {owner_user_account} = this.state;

        //Add this setState function to let the Refresh callback to update whenever a new followers/followings is added or removed
        Queue_Set_State(this.setState.bind(this), owner_user_account, "get_followers", "Online_Users");
        Queue_Set_State(this.setState.bind(this), owner_user_account, "get_followings", "Online_Users");


    }

    componentDidUpdate(prevProps, prevState){

        if(this.state.followers === prevState.followers && this.state.followings === prevState.followings){
            return;
        }

        let {owner_user_account, followers, followings} = this.state;

        //Report to followers that you are online
        this.socket.emit("report_online", {user_account: owner_user_account, followers});

        //Check all the followings to see who is online
        this.socket.emit("who_is_online", {user_account: owner_user_account, followings});

        if(this.props === prevProps){
            return;
        }

    }

    Setup_Socket = () => {

        this.socket = io("/global_events");

        this.socket.on("add_online_user", ({online_user}) => {

            let {online_followings } = this.state;

            let {id} = online_user;

            online_followings[id] = online_user;

            this.setState({online_followings});

        });

        this.socket.on("remove_offline_user", ({offline_user})=>{

            let {online_followings} = this.state;

            let {id} = offline_user;

            delete online_followings[id]

            this.setState({online_followings});

        });

        this.socket.on("followers_update", ()=>{

            Refresh(true);

        });

        this.socket.on("followings_update", async ()=>{

            await Refresh(false);

        });

        window.addEventListener("beforeunload", () => {

            let {owner_user_account, followers} = this.state;

            this.socket.emit("report_offline", {user_account: owner_user_account, followers});

        });

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

                    return <div key={key} className="online-user-entry">

                        <div id="profile-thumbnail-wrapper">

                            <Profile_Thumbnail 
                                profile={value}
                                owner_user_account={owner_user_account}
                                visitor_user_account={owner_user_account}
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
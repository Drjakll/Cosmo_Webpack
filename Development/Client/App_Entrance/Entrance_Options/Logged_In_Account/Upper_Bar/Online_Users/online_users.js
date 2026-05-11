import React, { Component } from 'react';
import './online_users.less';
import { Queue_Set_State, Refresh} from '@universal_components/Account_Functions/get_follows.js';
import { io } from 'socket.io-client';

class Online_Users extends Component {

    constructor(props) {

        super(props);

        let {owner_user_account} = this.props;

        this.state = {
            followings: [],
            owner_user_account
        };
    }

    componentDidMount() {

        Queue_Set_State(this.setState.bind(this), this.state.owner_user_account, "get_followings", "Online_Users");

    }

    render() {

        let {followings} = this.state;

        return <div id="online-users">

            <div id="online-users-label">

                {followings.length} Users Online 

            </div>

            <div id="online-users-list">

                

            </div>

        </div>;
    }
}

export default Online_Users;
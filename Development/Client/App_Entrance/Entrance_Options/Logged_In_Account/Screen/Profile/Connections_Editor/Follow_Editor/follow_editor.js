import React from 'react';
import Context from '@context/context.js';
import Follow_List from '@profile_template/Components/Connections/Follow_List/follow_list.js';
import Popup_Msg from '@popup_template/Popup_Message/popup_message.js';
import init_websocket from '@root/Utilities/init_websocket.js';
import './follow_editor.less';

class Follow_Editor extends Follow_List {

    static contextType = Context
    
    constructor(props){
        
        super(props);

        this.Init_Socket();

    }

    componentWillUnmount(){
        this.socket?.disconnect();
    }

    Init_Socket = ()=>{

        this.socket = init_websocket('/global_events', this.Init_Socket);

    }

    Remove_Follower = async (follower_id)=>{

        let confirmation = {agree: false};

        await Popup_Msg("confirm", "Are you sure you want to remove this follower?", confirmation);

        if(!confirmation.agree){
            return;
        }

        let {id} = this.state.owner_user_account;

        let {remove_follower} = this.context.Request_URLs;

        let body = {
            follower_id: follower_id,
            followed_id: id
        };

        await fetch(remove_follower, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        //Update the removed follower's followings list
        this.socket?.emit('report_update_followings', {follower_acc: {id: follower_id}});

        //Update this account's followers list
        this.socket?.emit('report_update_followers', {following_acc: {id}, follower_acc: {id: follower_id}});

    }

    Unfollow_User = async (following_id)=>{

        let confirmation = {agree: false};

        await Popup_Msg("confirm", "Are you sure you want to unfollow this user?", confirmation);

        if(!confirmation.agree){
            return;
        }

        let {id} = this.state.owner_user_account;

        let {unfollow_user_account} = this.context.Request_URLs;

        let body = {
            follower_id: id,
            followed_id: following_id
        };

        await fetch(unfollow_user_account, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        //Update the unfollowed user's followers list
        this.socket?.emit('report_update_followers', {following_acc: {id: following_id}, follower_acc: {id}});

        //Update this acccount's followings list
        this.socket?.emit('report_update_followings', {follower_acc: {id}});

    }
    
    render(){
        
        return (
            <div id="follow-editor">

                {super.render()}

            </div>
        );
    }
}

export default Follow_Editor;
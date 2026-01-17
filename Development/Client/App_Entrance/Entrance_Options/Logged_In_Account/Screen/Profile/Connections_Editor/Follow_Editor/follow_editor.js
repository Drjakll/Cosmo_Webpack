import React from 'react';
import Context from '@context/context.js';
import Follow_List from '@profile_template/Components/Connections/Follow_List/follow_list.js';
import './follow_editor.less';

class Follow_Editor extends Follow_List {

    static contextType = Context
    
    constructor(props){
        
        super(props);

    }

    Remove_Follower = async (follower_id)=>{

        if(!confirm("Are you sure you want to remove this follower?")){
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
    }

    Unfollow_User = async (following_id)=>{

        if(!confirm("Are you sure you want to unfollow this user?")){
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
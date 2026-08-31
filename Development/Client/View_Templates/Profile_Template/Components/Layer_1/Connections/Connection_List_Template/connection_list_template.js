import React, {Component} from 'react';
import Connection_List_Entry from './Connection_List_Entry/connection_list_entry.js';
import Popup_Message from '@popup_message';
import Request_URLs from '@request_urls';
import './connection_list_template.less';

class Connection_List_Template extends Component {

    Remove_User = null;
    Remove_Follower = null;
    Unfollow_User = null;
    Additional_Profile_Options = [];

    constructor(props){

        super(props);

        //The list is either followings, or followers
        let {followings, followers, list, owner_user_account, visitor_user_account, visitor_all_following_status} = props;

        this.state = {
            followings,
            followers,
            list,
            owner_user_account,
            visitor_user_account,
            mutuals: [],
            visitor_all_following_status: visitor_all_following_status || []
        };
    }

    async componentDidMount(){

        let {get_mutual_followings, get_mutual_followers} = Request_URLs;

        const url = this.props.label === "Following" ? get_mutual_followings : get_mutual_followers;

        await this.Get_Mutuals(url);
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
        
    }

    Get_Mutuals = async (url)=>{

        let {id: target_id} = this.state.owner_user_account;

        let res = await fetch(
            `${url}/${target_id}`,
            {
                method: "GET"
            }
        );

        if(res.ok){

            let {mutuals} = await res.json();

            this.setState({
                mutuals
            });

        } else {

            let {message} = await res.json();

            await Popup_Message("message", message);

        }

    }

    render(){

        let {owner_user_account, visitor_user_account, followings, followers, list, mutuals, visitor_all_following_status} = this.state;

        let the_list = followings || followers || list || [];

        let {label} = this.props;

        return <div id="connection-list-template">

            {the_list.length ? <div id="the-list-wrapper">

                {the_list.map((entry, key)=>{

                    let {id} = entry;

                    return <div className="connection-entry-wrapper" key={id}>

                            <Connection_List_Entry 
                                visitor_user_account={visitor_user_account}
                                owner_user_account={owner_user_account}
                                entry={entry}
                                Additional_Profile_Options={this.Additional_Profile_Options}
                                is_mutual={mutuals.some((user)=>{ return user.id === id && user.status === "accepted"; })}
                                label={label}
                                visitor_all_following_status={visitor_all_following_status}
                            />

                        </div>

                })}

            </div> : <div id="no-results-wrapper">No Results</div>}

        </div>;
    }
}

export default Connection_List_Template;
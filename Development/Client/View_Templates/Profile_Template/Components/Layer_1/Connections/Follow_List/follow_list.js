import React, {createRef} from 'react';
import Connection_List_Template from '../Connection_List_Template/connection_list_template.js';
import Search_Criteria_Box from '@search_criteria_box';
import Request_URLs from '@request_urls';
import {Get_Follows, Queue_Set_State, Refresh} from '@get_follows';
import './follow_list.less';

class Follow_List extends Connection_List_Template {

    search_crit_box_ref = createRef();

    result_box_ref = createRef();

    Unfollow_User = null;
    Remove_Follower = null;
    Execute_Search = null;

    constructor(props){

        super(props);

        this.Execute_Search = props.label === "Followers" ? this.Search_Followers : this.Search_Following;

    }

    componentDidMount(){

        this.Refresh = Refresh;

        let {owner_user_account, visitor_user_account} = this.state;

        let follow_type = this.props.label === "Followers" ? "get_followers" : "get_followings"
        
        Queue_Set_State(this.setState.bind(this), owner_user_account, follow_type, "Follow_List", owner_user_account.id !== visitor_user_account.id);

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

        let {label, owner_user_account, visitor_user_account} = this.props;

        this.Refresh(label === "Followers", owner_user_account.id !== visitor_user_account.id);
        
    }

    Search_Followers = async (search_criteria)=>{

        let {search_within_followers} = Request_URLs;

        let {owner_user_account} = this.state;

        let body = {
            requirements: search_criteria,
            self_account: owner_user_account
        };

        let data = await( await fetch(
            search_within_followers,
            {   
                method: "POST",
                body: JSON.stringify(body),
                headers: {  
                    'Content-Type': "application/json"
                }
            }
        )).json();

        if(data){

            this.setState({followers: data.results});
        } else {
            alert("Error applying search");
        }

    }

    Search_Following = async (search_criteria)=>{

        let {search_within_followings} = Request_URLs;

        let {owner_user_account} = this.state;

        let body = {
            requirements: search_criteria,
            self_account: owner_user_account
        };  

        let data = await( await fetch(
            search_within_followings,
            {   
                method: "POST",
                body: JSON.stringify(body), 
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();  

        if(data){

            this.setState({followings: data.results});

        } else {
            alert("Error applying search");
        }

    }


    render(){

        let {label} = this.props;
        let {followings, followers} = this.state;

        return <div id="following-connection-list-wrapper">

            <div id="search-criteria-box-wrapper"
                className="crit-not-focusing"
                ref={this.search_crit_box_ref}
                onClick={(e)=>{ 
                    this.search_crit_box_ref.current.className = "crit-focusing"; 
                    this.result_box_ref.current.className = "res-not-focusing";
                 }}
            >

                <Search_Criteria_Box Execute_Search={this.Execute_Search}/>

            </div>

            <div id="connection-list-container"
                className="res-focusing"
                ref={this.result_box_ref}
                onClick={(e)=>{ 
                    this.search_crit_box_ref.current.className = "crit-not-focusing"; 
                    this.result_box_ref.current.className = "res-focusing";
                 }}
            >

                <div id="follow-label">

                    {(followings || followers).length} {label}
                    
                </div>

                 <div id="the-follow-list-body">

                    {super.render()}

                </div>

            </div>

        </div>;
    }
}

export default Follow_List;
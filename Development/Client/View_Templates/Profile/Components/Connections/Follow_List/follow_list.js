import React, {createRef} from 'react';
import Connection_List_Template from '../Connection_List_Template/connection_list_template.js';
import Search_Criteria_Box from '@universal_components/Search_Criteria_Box/search_criteria_box.js';
import Context from '@context/context.js';
import './follow_list.less';

class Follow_List extends Connection_List_Template {

    static contextType = Context;

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

        let {label} = this.props;

        this.Refresh = label === "Followers" ? this.Get_All_Followers : this.Get_All_Following;

        this.setState({
            Refresh: this.Refresh
        });
        
        this.Refresh();
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

        this.Refresh();
        
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

        this.setState({
            list: data?.results ?? []
        })

        console.log(data);

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

        this.setState({
            list: data?.results ?? []
        });

    }

    Search_Followers = async (search_criteria)=>{

        let {search_within_followers} = this.context.Request_URLs;

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

            this.setState({list: data.results});
        } else {
            alert("Error applying search");
        }

    }

    Search_Following = async (search_criteria)=>{

        let {search_within_followings} = this.context.Request_URLs;

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

            this.setState({list: data.results});
        } else {
            alert("Error applying search");
        }

    }


    render(){

        let {label} = this.props;
        let {list} = this.state;

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

            <div id="following-label">

                {list.length} {label}
                
            </div>

            <div id="connection-list-container"
                className="res-focusing"
                ref={this.result_box_ref}
                onClick={(e)=>{ 
                    this.search_crit_box_ref.current.className = "crit-not-focusing"; 
                    this.result_box_ref.current.className = "res-focusing";
                 }}
            >

                {super.render()}

            </div>

        </div>;
    }
}

export default Follow_List;
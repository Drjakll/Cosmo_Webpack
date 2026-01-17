import React, {Component} from 'react';
import Connection_List_Template from '../Connection_List_Template/connection_list_template.js';
import Context from '@context/context.js';
import './follow_list.less';

class Follow_List extends Connection_List_Template {

    static contextType = Context;

    Unfollow_User = null;
    Remove_Follower = null;

    constructor(props){

        super(props);



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


    render(){

        let {label} = this.props;
        let {list} = this.state;

        return <div id="following-connection-list-wrapper">

            <div id="following-label">

                {list.length} {label}
                
            </div>

            <div id="connection-list-container">

                {super.render()}

            </div>

        </div>;
    }
}

export default Follow_List;
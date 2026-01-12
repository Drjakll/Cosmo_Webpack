import React, {Component} from 'react';
import Context  from '@context/context.js';
import './connections.less';

class Connections extends Component {

    static contextType = Context;

    constructor(props){

        super(props);

        let {owner_user_account, visitor_user_account} = props;

        this.state = {
            owner_user_account,
            visitor_user_account,
            followers: [],
            following: []
        };
    }

    componentDidMount(){

        this.Get_Connections();

    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        await this.setState(this.props);

    }

    Get_Connections = async ()=>{

        this.setState({
                        followers: await this.Get_All_Followers(),
                        following: await this.Get_All_Following()
                    });
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

        if(data){

            return data.results;
        }

        return [];

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

        if(data){

            return data.results;
            
        }

        return [];
    }

    render(){

        let {followers, following} = this.state;

        return <div id="connections-bar">

            <div id="connection-types">

                <div id="followers-button" className="follow-button">{followers.length} Followers</div>

                <div id="following-button" className="follow-button">{following.length} Following</div>

            </div>

        </div>;
    }
}

export default Connections;
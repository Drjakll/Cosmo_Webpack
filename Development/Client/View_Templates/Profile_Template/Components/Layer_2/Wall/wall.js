import React, {Component} from 'react';
import Comments_Container from '@comments_container';
import Popup_Message from '@popup_message';
import Request_URLs from '@request_urls';
import popup_message from '@popup_message';
import './wall.less';

class Wall extends Component {

    //This may get overriden by any child class
    The_Comments_Container = Comments_Container;

    constructor(props){

        super(props);

        let {owner_user_account, visitor_user_account} = props;

        this.state = {
            owner_user_account,
            visitor_user_account,
            wall_data: null
        };
    }

    async componentDidMount(){

        let {id: user_id} = this.state.owner_user_account

        let wall_data = await this.Get_Wall(user_id);

        this.setState({wall_data});

    }

    Get_Wall = async (user_id)=>{

        if(!user_id){
            return;
        }

        let res = await fetch(`/get_user_wall/${user_id}`, {
            method: "GET"
        });

        let data = await res.json();

        if(!data){
            Popup_Message("message", "Error fetching the request for the wall");
            return null;
        }

        if(!data.wall){
            Popup_Message("message", data.message);
            return null;
        }

        return data.wall;
    }

    render(){

        const {The_Comments_Container} = this;

        let {wall_data, owner_user_account, visitor_user_account} = this.state;

        let {id: wall_id} = wall_data || {id: null};

        return <div id="wall">
            
            <div id="wall-label-wrapper">
                
                <img src='./static/wall.webp'/>

                <label>Wall</label>

            </div>

            <div id="wall-comments-wrapper">

                {wall_id ? <The_Comments_Container 
                                target_id={wall_id} 
                                target_id_type={"wall_id"} 
                                owner_user_account={owner_user_account}
                                visitor_user_account={visitor_user_account}
                            /> : 
                        ""}

            </div>

        </div>;
    }
}

export default Wall;
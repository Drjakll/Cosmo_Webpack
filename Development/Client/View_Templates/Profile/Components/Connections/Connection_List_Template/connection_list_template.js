import React, {Component} from 'react';
import Connection_List_Entry from './Connection_List_Entry/connection_list_entry.js';
import './connection_list_template.less';

class Connection_List_Template extends Component {

    Remove_User = null;
    Remove_Follower = null;
    Unfollow_User = null;

    constructor(props){

        super(props);

        //The list is either followings, or followers
        let {list, owner_user_account, visitor_user_account} = props;

        list = list || [];

        this.state = {
            list,
            owner_user_account,
            visitor_user_account
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
        
    }

    render(){

        let {owner_user_account, visitor_user_account, list} = this.state;

        let {label} = this.props;

        this.Remove_User = label === "Followers" ? this.Remove_Follower : this.Unfollow_User;

        return <div id="connection-list-template">

            {list.length ? <div id="the-list-wrapper">

                {list.map((entry, key)=>{

                    return <div className="connection-entry-wrapper" key={key}>

                            <Connection_List_Entry 
                                visitor_user_account={visitor_user_account}
                                owner_user_account={owner_user_account}
                                entry={entry}
                                Remove_User={this.Remove_User}
                            />

                        </div>

                })}

            </div> : <div id="no-results-wrapper">No Results</div>}

        </div>;
    }
}

export default Connection_List_Template;
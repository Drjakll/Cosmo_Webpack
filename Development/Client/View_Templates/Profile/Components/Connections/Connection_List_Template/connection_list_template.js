import React, {Component} from 'react';
import Connection_List_Entry from './Connection_List_Entry/connection_list_entry.js';
import './connection_list_template.less';

class Connection_List_Template extends Component {

    constructor(props){

        super(props);

        //The list is either followings, or followers
        let {list, owner_user_account, visitor_user_account} = props;

        this.state = {
            list,
            owner_user_account,
            visitor_user_account
        };
    }

    componentDidMount(){

        

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

    }

    render(){

        let {owner_user_account, visitor_user_account, list} = this.state;

        return <div id="connection-list-template">

            <div id="the-list-wrapper">

                {list.map((entry, key)=>{

                    return <div className="connection-entry-wrapper" key={key}>

                            <Connection_List_Entry 
                                visitor_user_account={visitor_user_account}
                                owner_user_account={owner_user_account}
                                entry={entry}
                            />

                        </div>

                })}

            </div>

        </div>;
    }
}

export default Connection_List_Template;
import React, {Component} from 'react';
import Context from '@context/context.js';
import Profile_Thumbnail from '@universal_components/Profile_Thumbnail/profile_thumbnail.js';
import './connection_list_entry.less';

class Connection_Entry_Template extends Component {

    static contextType = Context

    constructor(props){

        super(props);

        let {entry, visitor_user_account, owner_user_account} = props;

        this.state = {
            entry,
            visitor_user_account,
            owner_user_account
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

        let {entry, owner_user_account, visitor_user_account} = this.state;

        let {first_name, last_name} = entry;

        return <div id="connection-list-entry-wrapper">

            <div id="profile-picture-wrapper">

                <Profile_Thumbnail 
                    visitor_user_account={visitor_user_account}
                    owner_user_account={owner_user_account}
                    profile={entry}
                />

            </div>

            <div id="name-label-wrapper">

                <label>{first_name} {last_name}</label>

            </div>

        </div>;
    }
}

export default Connection_Entry_Template;
import React, {Component} from 'react';
import Profile_Thumbnail from '@profile_thumbnail';
import './connection_list_entry.less';

class Connection_Entry_Template extends Component {

    constructor(props){

        super(props);

        let {entry, visitor_user_account, owner_user_account, is_mutual} = props;

        this.state = {
            entry,
            visitor_user_account,
            owner_user_account,
            is_mutual
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

        let {entry, owner_user_account, visitor_user_account, is_mutual, visitor_all_following_status} = this.state;

        let {Additional_Profile_Options, label} = this.props;

        let {first_name, last_name} = entry;

        return <div id="connection-list-entry-wrapper">

            <div id="profile-picture-wrapper">

                <Profile_Thumbnail 
                    visitor_user_account={visitor_user_account}
                    owner_user_account={owner_user_account}
                    profile={entry}
                    additional_options={Additional_Profile_Options}
                    visitor_all_following_status={visitor_all_following_status}
                />

            </div>

            <div id="name-label-wrapper">

                <label>{first_name} {last_name}</label>

            </div>

            {is_mutual && visitor_user_account.id !== owner_user_account.id ? <label id="mutual-label">Mutual {label}</label> : ""}

        </div>;
    }
}

export default Connection_Entry_Template;
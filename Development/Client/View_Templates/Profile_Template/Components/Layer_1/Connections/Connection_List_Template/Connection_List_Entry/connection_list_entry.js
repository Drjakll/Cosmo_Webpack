import React, {Component} from 'react';
import Profile_Thumbnail from '@profile_thumbnail';
import './connection_list_entry.less';

class Connection_Entry_Template extends Component {

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

        let {Remove_User} = this.props;

        let {first_name, last_name} = entry;

        return <div id="connection-list-entry-wrapper">
            
            {Remove_User ? <div id="remove-user-button-wrapper">

                <div 
                    id="remove-user-button"
                    onClick={async ()=>{

                        await Remove_User(entry.id);
                    }}
                >
                    &#10008;
                </div>

            </div> : null}

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
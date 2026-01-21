import React, {Component} from 'react';
import Profile_Thumbnail from '@universal_components/Profile_Thumbnail/profile_thumbnail.js';
import './follow_request.less';

class Follow_Request extends Component {

    constructor(props){

        super(props);

        let {value, owner_user_account} = props;

        this.state = {
            value,
            owner_user_account
        };
    }

    Answer_Request = (accept) => {

    }

    render(){

        let {value, owner_user_account} = this.state;

        value.id = value.follower_id;

        let {first_name, last_name} = value;

        return <div id="follow-request-wrapper">

            <div id="top">

                <div id="profile-thumbnail-wrapper">

                    <Profile_Thumbnail 
                        profile={value}
                        owner_user_account={owner_user_account}
                        visitor_user_account={owner_user_account}
                    />

                </div>

                <div id="answer-buttons-wrapper">

                    <div className="answer-button">Accept</div>
                    <div className="answer-button">Reject</div>

                </div>

            </div>

            <div id="request-name-wrapper">

                {first_name} {last_name} wants to follow you.

            </div>

        </div>;
    }
}

export default Follow_Request;
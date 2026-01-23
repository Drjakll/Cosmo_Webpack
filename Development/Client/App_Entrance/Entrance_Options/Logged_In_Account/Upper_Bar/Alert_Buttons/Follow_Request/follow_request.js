import React, {Component} from 'react';
import Profile_Thumbnail from '@universal_components/Profile_Thumbnail/profile_thumbnail.js';
import Context from '@context/context.js';
import './follow_request.less';

class Follow_Request extends Component {

    static contextType = Context;

    constructor(props){

        super(props);

        let {value, owner_user_account} = props;

        this.state = {
            value,
            owner_user_account
        };
    }

    Answer_Request = async (accept) => {

        let {update_follow_request} = this.context.Request_URLs;

        let {followed_id, follower_id} = this.state.value;

        let status = accept ? "accepted" : "rejected";

        let body = {
            follower_id,
            followed_id,
            status
        };

        await fetch(update_follow_request, 
            {
                method: "PATCH",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        await this.props.Refresh_Alerts();

        window.Refresh_Login();
    }

    render(){

        let {value, owner_user_account} = this.state;

        value.id = value.follower_id;

        let {first_name, last_name} = value;

        return <div id="follow-request-wrapper">

            <div id="follow-request-answers">

                <div id="profile-thumbnail-wrapper">

                    <div id="inner-wrapper">

                        <Profile_Thumbnail 
                            profile={value}
                            owner_user_account={owner_user_account}
                            visitor_user_account={owner_user_account}
                        />

                    </div>

                </div>

                <div id="answer-buttons-wrapper">

                    <div className="answer-button" onClick={(e)=>{ this.Answer_Request(true); }}>Accept</div>
                    <div className="answer-button" onClick={(e)=>{ this.Answer_Request(false); }}>Reject</div>

                </div>

            </div>

            <div id="request-name-wrapper">

                {first_name} {last_name} wants to follow you.

            </div>

        </div>;
    }
}

export default Follow_Request;
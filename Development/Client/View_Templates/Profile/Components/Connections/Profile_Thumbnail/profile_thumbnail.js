import React, { Component } from 'react';
import './profile_thumbnail.less';

class Profile_Thumbnail extends Component {

    constructor(props){

        super(props);

        Profile_Thumbnail.contextType = window.Context;

        let {connection_profile, current_user_account_data} = this.props;

        this.state = {
            connection_profile: connection_profile,
            current_user_account_data: current_user_account_data,
            view_profile_data: false //The profile selected for popup view
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

    }   

    View_Popup_Profile = (open_view)=>{

        const {Profile_Popup} = this.context;

        return open_view ? <Profile_Popup account_data={this.state.connection_profile} Exit={this.Exit_Popup}/> : "";
    }

    Exit_Popup = ()=>{

        this.setState({
            view_profile_data: false
        });
    }

    render(){

        let {aws_s3_url} = this.context.Request_URLs;

        let {connection_profile, current_user_account_data} = this.state;

        let {profile_picture_link, first_name, last_name} = connection_profile;

        return <div className="profile-thumbnail-wrapper">

            {this.View_Popup_Profile(this.state.view_profile_data)}

            <div id="profile-thumbnail-image-wrapper">

                <img id="profile-thumbnail-image" 
                    src={`${aws_s3_url}${profile_picture_link}`} 
                    alt="Profile Thumbnail"
                    onClick={(e)=>{ this.setState({view_profile_data: true}); }}
                    draggable={false}
                />

            </div>

            <div id="connection-name-wrapper">

                <label id="connection-name">{`${first_name} ${last_name}`}</label>  

            </div>

            <div id="connection-options-wrapper">

                {this.props.generate_options ? this.props.generate_options(connection_profile, this.props.array_index) : null}

            </div>

        </div>;
    }
}

export default Profile_Thumbnail;
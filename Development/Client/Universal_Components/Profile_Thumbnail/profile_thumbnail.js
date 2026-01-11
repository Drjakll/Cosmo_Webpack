import React, { Component } from 'react';
import Context from '@context/context.js';
import Portal from '@popup_template/portal.js';
import './profile_thumbnail.less';

class Profile_Thumbnail extends Component {

    constructor(props){

        super(props);

        Profile_Thumbnail.contextType = Context;

        let {profile, owner_user_account, visitor_user_account, rounded_portrait} = this.props;

        this.state = {
            profile,
            owner_user_account,
            visitor_user_account,
            show_popup: false,
            rounded_portrait: rounded_portrait || false
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

    }   

    View_Popup_Profile = ()=>{

        const {Profile_Popup} = this.context;

        let {show_popup} = this.state;

        let {profile, owner_user_account, visitor_user_account} = this.state;

        return show_popup ? <Portal>                
            
            <Profile_Popup 
                this_profile_data={profile}
                owner_user_account={owner_user_account} 
                visitor_user_account={visitor_user_account} 
                Exit={this.Exit_Popup}/> 

        </Portal> : ""
    }

    Exit_Popup = ()=>{

        this.setState({show_popup: false})
    }

    render(){

        let {aws_s3_url} = this.context.Request_URLs;

        let {profile, rounded_portrait} = this.state;

        let {profile_picture_link } = profile;

        return <div className="profile-thumbnail-wrapper">

            {this.View_Popup_Profile()}

            <div id="profile-thumbnail-image-wrapper">

                <img id="profile-thumbnail-image" 
                    src={`${aws_s3_url}${profile_picture_link}`} 
                    alt="Profile Thumbnail"
                    onClick={(e)=>{
                        this.setState({show_popup: true});
                    }}
                    style={{ borderRadius: rounded_portrait ? "50%" : "" }}
                    draggable={false}
                />

            </div>

            <div id="connection-options-wrapper">

                {this.props.generate_options && this.props.generate_options(profile, this.props.array_index)}

            </div>

        </div>;
    }
}

export default Profile_Thumbnail;
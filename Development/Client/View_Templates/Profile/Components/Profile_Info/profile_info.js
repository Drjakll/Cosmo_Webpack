import React, {Component} from 'react';
import Profile_Picture from './Profile_Picture/profile_picture.js';
import Profile_Info_Data from './Profile_Info_Data/profile_info_data.js';
import './profile_info.less';

class Profile_Info extends Component {
    
    constructor(props){
        
        super(props);

        Profile_Info.contextType = window.Context;

        let {owner_user_account, visitor_user_account} = this.props.properties;

        this.state = {
            owner_user_account,
            visitor_user_account
        };
        
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        let properties = this.props.properties;
        
        this.setState(properties);
        
    }

    Refresh_Account_Data = () => {

        window.LoginAttempt();

    }
    
    
    render(){
        
        let { profile_photo_editor, profile_data_editor } = this.state;
        
        return (
                <div id="profile-info">
                    
                    <div id="profile-picture-wrapper">

                        <Profile_Picture owner_user_account={this.state.owner_user_account} generate_editors={profile_photo_editor} refresh_account_data={this.Refresh_Account_Data} />
                        
                    </div>
                    
                    <div id="profile-info-wrapper">
                        
                        <Profile_Info_Data owner_user_account={this.state.owner_user_account} generate_editors={profile_data_editor} refresh_account_data={this.Refresh_Account_Data} />
                        
                    </div>
                    
                </div>
            );
    }
}

export default Profile_Info;
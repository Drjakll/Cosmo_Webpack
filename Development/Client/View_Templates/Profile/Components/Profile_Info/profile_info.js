import React, {Component} from 'react';
import Profile_Picture from './Profile_Picture/profile_picture.js';
import Profile_Info_Data from './Profile_Info_Data/profile_info_data.js';
import './profile_info.less';

class Profile_Info extends Component {
    
    constructor(props){
        
        super(props);

        Profile_Info.contextType = window.Context;

        let {owner_user_account, visitor_user_account, profile_photo_editor, profile_data_editor, change_display} = this.props;

        this.state = {
            owner_user_account,
            visitor_user_account,
            Profile_Picture, 
            Profile_Info_Data,
            change_display
        };
        
    }

    componentDidMount(){
        
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        let properties = this.props;
        
        this.setState(properties);
        
    }

    Refresh_Account_Data = () => {

        window.LoginAttempt();

    }
    
    render(){
        
        let { visitor_user_account, owner_user_account, Profile_Picture, Profile_Info_Data } = this.state;

        let { change_display } = this.props;
        
        return (
                <div id="profile-info">
                    
                    <div id="profile-picture-wrapper">

                        <Profile_Picture 
                            owner_user_account={owner_user_account} 
                            visitor_user_account={visitor_user_account} 
                            refresh_account_data={this.Refresh_Account_Data} 
                        />
                        
                    </div>
                    
                    <div id="profile-info-wrapper">
                        
                        <Profile_Info_Data 
                            owner_user_account={owner_user_account} 
                            visitor_user_account={visitor_user_account}
                            refresh_account_data={this.Refresh_Account_Data} 
                            change_main_display={change_display}
                        />
                        
                    </div>
                    
                </div>
            );
    }
}

export {Profile_Info, Profile_Picture, Profile_Info_Data}
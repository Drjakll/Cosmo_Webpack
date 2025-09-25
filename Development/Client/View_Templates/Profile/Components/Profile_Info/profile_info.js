import React, {Component} from 'react';
import Profile_Picture from './Profile_Picture/profile_picture.js';
import Profile_Info_Data from './Profile_Info_Data/profile_info_data.js';
import './profile_info.less';

class Profile_Info extends Component {
    
    constructor(props){
        
        super(props);

        Profile_Info.contextType = window.Context;

        this.state = {
            account_data: {}
        };
        
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        let properties = this.props.properties;
        
        for(let i in properties){
            
            this.state[i] = properties[i];
             
        }
        
        this.setState(this.state);
        
    }

    Refresh_Account_Data = () => {

        window.LoginAttempt();

    }
    
    
    render(){
        
        let { profile_photo_editor, profile_data_editor } = this.state;
        
        return (
                <div id="profile-info">
                    
                    <div id="profile-picture-wrapper">

                        <Profile_Picture account_data={this.state.account_data} generate_editors={profile_photo_editor} refresh_account_data={this.Refresh_Account_Data} />
                        
                    </div>
                    
                    <div id="profile-info-wrapper">
                        
                        <Profile_Info_Data account_data={this.state.account_data} generate_editors={profile_data_editor} refresh_account_data={this.Refresh_Account_Data} />
                        
                    </div>
                    
                </div>
            );
    }
}

export default Profile_Info;
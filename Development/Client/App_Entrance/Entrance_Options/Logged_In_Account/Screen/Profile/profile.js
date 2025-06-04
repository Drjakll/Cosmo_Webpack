import React, {Component} from 'react';
import Profile_Photo_Editor from './Profile_Photo_Editor/profile_photo_editor.js';
import Profile_Data_Editor from './Profile_Data_Editor/profile_data_editor.js';
import './profile.less';

class Profile extends Component {
    
    constructor(props){
        
        super(props);
        
        Profile.contextType = window.Context;
    }
    
    GetAccountData = (UpdateAllComponentProps) => {
        
        const {Cookie_Tools, Account_Data_Templates } = this.context;
        
        this.profile_data = Account_Data_Templates.Account_Data_Template();
        
        let cookie_data = Cookie_Tools.cookie_parser(document.cookie);
        
        for(let key in this.profile_data){
            
            this.profile_data[key] = cookie_data[key];
            
        }
        
        UpdateAllComponentProps({account_data: this.profile_data});
    }
    
    Generate_Profile_Photo_Editor = ({ account_data, refresh_account_data }) => {
        
        return <Profile_Photo_Editor account_data={account_data} refresh_account_data={refresh_account_data}/>;
    }
    
    render(){
        
        const { Profile_Template } = this.context;
        
        return (
            <div id="profile">

                <Profile_Template
                    get_account_data={this.GetAccountData}
                    add_editors={{
                        "Profile Info": {
                            profile_photo_editor: this.Generate_Profile_Photo_Editor,
                            profile_data_editor: Profile_Data_Editor
                        }
                    }}
                />

            </div>
        );
    }
}

export default Profile;
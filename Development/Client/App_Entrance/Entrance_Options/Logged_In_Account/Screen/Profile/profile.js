import React, {Component} from 'react';
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
            
            if(!cookie_data[key]){
                return;
            }
            
            this.profile_data[key] = cookie_data[key];
            
        }
        
        UpdateAllComponentProps({account_data: this.profile_data});
    }
    
    render(){
        
        const {Profile_Template} = this.context;
        
        return (
                <div id="profile">
                    
                    <Profile_Template get_account_data={this.GetAccountData}/>
                    
                </div>
            );
    }
}

export default Profile;
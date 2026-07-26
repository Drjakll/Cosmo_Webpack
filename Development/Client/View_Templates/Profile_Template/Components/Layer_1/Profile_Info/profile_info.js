import React, {Component} from 'react';
import Profile_Picture from './Profile_Picture/profile_picture.js';
import Profile_Info_Data from './Profile_Info_Data/profile_info_data.js';
import './profile_info.less';

class Profile_Info extends Component {

    Profile_Picture = Profile_Picture //The reason why I put this here is because whatever inherits this class can replace this, else it will use the original component
    Profile_Info_Data = Profile_Info_Data //The reason why I put this here is because whatever inherits this class can replace this, else it will use the original component
    
    constructor(props){
        
        super(props);

        let {owner_user_account, visitor_user_account, change_display} = props;

        this.state = {
            owner_user_account,
            visitor_user_account,
            change_display
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
        
        let { visitor_user_account, owner_user_account} = this.state;

        let {Profile_Picture, Profile_Info_Data } = this;

        let { change_display } = this.props;
        
        return (
                <div id="profile-info">
                    
                    <div id="profile-picture-wrapper">

                        <Profile_Picture 
                            owner_user_account={owner_user_account} 
                            visitor_user_account={visitor_user_account} 
                            change_main_display={change_display}
                        />
                        
                    </div>
                    
                    <div id="profile-info-wrapper">
                        
                        <Profile_Info_Data 
                            owner_user_account={owner_user_account} 
                            visitor_user_account={visitor_user_account}
                            change_main_display={change_display}
                        />
                        
                    </div>
                    
                </div>
            );
    }
}

export default Profile_Info;
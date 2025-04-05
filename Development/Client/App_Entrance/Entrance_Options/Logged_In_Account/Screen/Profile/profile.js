import React, {Component} from 'react';
import './profile.less';

class Profile extends Component {
    
    constructor(props){
        
        super(props);
        
        Profile.contextType = window.Context;
    }
    
    render(){
        
        const {Profile_Template} = this.context;
        
        return (
                <div id="profile">
                    
                    <Profile_Template/>
                    
                </div>
            );
    }
}

export default Profile;
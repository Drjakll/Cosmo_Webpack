import React, {Component} from 'react';
import './profile_picture.less';

class Profile_Picture extends Component {
    
    constructor(props){
        
        super(props);
        
        Profile_Picture.contextType = window.Context;
        
        this.state = {
            account_data: {}
        };
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        for(let i in this.props){
            
            this.state[i] = this.props[i];
        }
        
        this.setState(this.state);
    }
    
    render(){
        
        const {Request_URLs} = this.context;
        
        return (
                <div id="profile-picture">
                    
                    <div id="profile-picture-image-wrapper">
                        
                        <div id="profile-photo" 
                        style={{
                            backgroundImage: `url('${Request_URLs?.aws_s3_url}${this.state.account_data.profile_picture_link}')`
                        }}>
                                
                        </div>
                        
                    </div>
                    
                </div>
            );
    }
}

export default Profile_Picture;
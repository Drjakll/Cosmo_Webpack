import React, { Component } from 'react';
import Enlarged_Profile_Photo from './Enlarged_Profile_Photo/enlarged_profile_photo.js';
import './profile_picture.less';

class Profile_Picture extends Component {
    
    constructor(props){
        
        super(props);
        
        Profile_Picture.contextType = window.Context;

        let { owner_user_account } = this.props
        
        this.state = {
            owner_user_account,
            enlarge_photo: false
        };
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
        
    }

    Turn_Off_Enlarge = () => {
        
        this.setState({ enlarge_photo: false });
        
    }
    
    render(){
        
        const { Request_URLs } = this.context;
        const { aws_s3_url } = Request_URLs;
        
        let {owner_user_account} = this.state;
        const { profile_picture_link } = owner_user_account;

        return (
            <div id="profile-picture" className={this.state.enlarge_photo ? "enlarged-photo" : ""}>

                {this.state.enlarge_photo ? <Enlarged_Profile_Photo turn_off_enlarge={this.Turn_Off_Enlarge} full_url={`${aws_s3_url}${profile_picture_link}`} /> : <></>}
                
                <div id="profile-picture-image-wrapper">
                        
                    <div id="profile-photo"
                        style={{
                            backgroundImage: `url('${aws_s3_url}${profile_picture_link}')`
                        }}
                        onClick ={(e) => { this.setState({ enlarge_photo: true }); }}
                    >
                                
                    </div>
                        
                </div>
                    
            </div>
        );
    }
}

export default Profile_Picture;
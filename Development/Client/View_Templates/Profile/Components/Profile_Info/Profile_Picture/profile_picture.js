import React, { Component } from 'react';
import Enlarged_Profile_Photo from './Enlarged_Profile_Photo/enlarged_profile_photo.js';
import './profile_picture.less';

class Profile_Picture extends Component {
    
    constructor(props){
        
        super(props);
        
        Profile_Picture.contextType = window.Context;
        
        this.state = {
            account_data: {},
            enlarge_photo: false
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

    Turn_Off_Enlarge = () => {
        this.setState({ enlarge_photo: false });
    }
    
    render(){
        
        const { Request_URLs } = this.context;
        const { aws_s3_url } = Request_URLs;
        const { profile_picture_link } = this.state.account_data;

        return (
            <div id="profile-picture">

                {this.state.enlarge_photo ? <Enlarged_Profile_Photo turn_off_enlarge={this.Turn_Off_Enlarge} full_url={`${aws_s3_url}${profile_picture_link}`} /> : <></>}
                    
                <div id="profile-picture-image-wrapper">
                        
                    <div id="profile-photo"
                        style={{
                            backgroundImage: `url('${aws_s3_url}${profile_picture_link}')`
                        }}
                        onClick={(e) => { this.setState({ enlarge_photo: true }); }}
                    >
                                
                    </div>
                        
                </div>
                    
            </div>
        );
    }
}

export default Profile_Picture;
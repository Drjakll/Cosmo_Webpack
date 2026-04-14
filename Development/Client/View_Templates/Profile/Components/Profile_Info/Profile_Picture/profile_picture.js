import React, { Component } from 'react';
import Enlarged_Profile_Photo from './Enlarged_Profile_Photo/enlarged_profile_photo.js';
import './profile_picture.less';
import {createRoot} from 'react-dom/client';

class Profile_Picture extends Component {
    
    constructor(props){
        
        super(props);
        
        Profile_Picture.contextType = window.Context;

        let { owner_user_account } = this.props
        
        this.state = {
            owner_user_account
        };
    }

    componentDidMount(){
        
        let {aws_s3_url} = this.context.Request_URLs;
        let {profile_picture_link} = this.state.owner_user_account;

        this.enlarged_container = document.createElement("div");

        let enlarged_picture = <Enlarged_Profile_Photo turn_off_enlarge={this.Turn_Off_Enlarge} full_url={`${aws_s3_url}${profile_picture_link}`} />;

        this.react_root = createRoot(this.enlarged_container);
        this.react_root.render(enlarged_picture);
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
        
    }

    Turn_Off_Enlarge = () => {
        
        document.body.removeChild(this.enlarged_container);

    }

    Inject_Large_Photo_To_Body = ()=>{

        document.body.appendChild(this.enlarged_container);

    }
    
    render(){
        
        const { Request_URLs } = this.context;
        const { aws_s3_url } = Request_URLs;
        
        let { owner_user_account } = this.state;
        const { profile_picture_link, first_name, last_name } = owner_user_account;

        return (
            <div id="profile-picture" className={this.state.enlarge_photo ? "enlarged-photo" : ""}>
                
                <div id="profile-picture-image-wrapper">
                        
                    <div id="profile-photo"
                        style={{
                            backgroundImage: `url('${aws_s3_url}${profile_picture_link}')`
                        }}
                        onClick ={(e) => { this.Inject_Large_Photo_To_Body(); }}
                    >
                                
                    </div>

                    <div id="name-tag">

                        {first_name} {last_name}

                    </div>
                        
                </div>
                    
            </div>
        );
    }
}

export default Profile_Picture;
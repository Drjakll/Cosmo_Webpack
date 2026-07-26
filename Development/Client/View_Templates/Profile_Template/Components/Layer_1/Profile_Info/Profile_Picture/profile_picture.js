import React, { Component } from 'react';
import Enlarged_Profile_Photo from './Enlarged_Profile_Photo/enlarged_profile_photo.js';
import Request_URLs from '@request_urls';
import './profile_picture.less';
import {createRoot} from 'react-dom/client';

class Profile_Picture extends Component {
    
    constructor(props){
        
        super(props);
        

        let { owner_user_account } = this.props
        
        this.state = {
            owner_user_account
        };
    }

    componentDidMount(){
        
        let {aws_s3_url} = Request_URLs;
        let {profile_picture_link} = this.state.owner_user_account;

        this.enlarged_container = document.createElement("div");

        const placeholder = './static/pp_placeholder.webp';
        const pp_link = `${aws_s3_url}${profile_picture_link}`;

        let enlarged_picture = <Enlarged_Profile_Photo turn_off_enlarge={this.Turn_Off_Enlarge} full_url={`${profile_picture_link ? pp_link : placeholder}`} />;

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

        const { aws_s3_url } = Request_URLs;
        
        let { owner_user_account } = this.state;
        const { profile_picture_link, first_name, last_name } = owner_user_account;
        
        const placeholder = './static/pp_placeholder.webp';
        const pp_link = `${aws_s3_url}${profile_picture_link}`;

        return (
            <div id="profile-picture" className={this.state.enlarge_photo ? "enlarged-photo" : ""}>
                
                <div id="profile-picture-image-wrapper">
                        
                    <div id="profile-photo"
                        style={{
                            backgroundImage: `url('${profile_picture_link ? pp_link : placeholder}')`
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
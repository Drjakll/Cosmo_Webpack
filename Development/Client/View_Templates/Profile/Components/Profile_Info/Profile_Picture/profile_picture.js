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
    
    Refresh_Account_Data = ()=>{
        
        let {Account_Data_Templates, Cookie_Tools} = this.context;
        let {cookie_parser} = Cookie_Tools;
        
        let cookie_json = cookie_parser(document.cookie);
        
        let updated_account_data = Account_Data_Templates(cookie_json);
        
        this.setState({account_data: updated_account_data});
        
    }

    Turn_Off_Enlarge = () => {
        
        this.setState({ enlarge_photo: false });
        
    }
    
    render(){
        
        const { Request_URLs } = this.context;
        const { aws_s3_url } = Request_URLs;
        
        let {account_data} = this.state;
        const { profile_picture_link } = account_data;
        
        const { generate_editors } = this.props;

        return (
            <div id="profile-picture">

                {this.state.enlarge_photo ? <Enlarged_Profile_Photo turn_off_enlarge={this.Turn_Off_Enlarge} full_url={`${aws_s3_url}${profile_picture_link}`} /> : <></>}
                
                {generate_editors ? generate_editors({account_data: account_data, refresh_account_data: this.Refresh_Account_Data}) : <></>}
                
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
import {Profile_Info} from '@profile_template';
import React, {Component} from 'react';
import Context from '@context/context.js';
import Profile_Picture from './Profile_Photo_Editor/profile_photo_editor.js';
import Profile_Info_Data from './Profile_Data_Editor/profile_data_editor.js';
import './profile_info_editor.less';

class Profile_Info_Editor extends Profile_Info {
    
    constructor(props){
        
        super(props);
        
        Profile_Info_Editor.contextType = Context;

    }

    Profile_Picture = Profile_Picture;

    Profile_Info_Data = Profile_Info_Data;

    componentDidMount(){

        super.componentDidMount();

    }

    componentDidUpdate(prevProps, prevState){

        super.componentDidUpdate(prevProps, prevState);
        
    }
    
    render(){
        
        return (
            <div id="profile-info-editor">

                {super.render()}

            </div>
        );
    }
}

export default Profile_Info_Editor; 
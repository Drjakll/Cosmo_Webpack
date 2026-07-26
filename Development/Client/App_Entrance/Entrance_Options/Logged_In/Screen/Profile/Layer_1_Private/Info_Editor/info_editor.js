import Profile_Info from '@profile_info';
import React, {Component} from 'react';
import Profile_Picture from './Photo_Editor/photo_editor.js';
import Profile_Info_Data from './Data_Editor/data_editor.js';
import './info_editor.less';

class Profile_Info_Editor extends Profile_Info {
    
    constructor(props){
        
        super(props);
        

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
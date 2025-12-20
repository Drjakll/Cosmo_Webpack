import {Profile_Info} from '@profile_template';
import React, {Component} from 'react';
import Context from '@context/context.js';
import './profile_info_editor.less';

class Profile_Info_Editor extends Profile_Info {
    
    constructor(props){
        
        super(props);
        
        Profile_Info_Editor.contextType = Context;

    }

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
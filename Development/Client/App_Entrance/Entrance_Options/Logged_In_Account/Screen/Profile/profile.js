import React, {Component} from 'react';
import Profile_Info_Editor from './Profile_Info_Editor/profile_info_editor.js';
import Album_Editor from './Album_Editor/album_editor.js';
import Post_Editor from './Post_Editor/post_editor.js';
import Connections_Editor from './Connections_Editor/connections_editor.js';
import {Profile_Template} from '@profile_template';
import Context from '@context/context.js';
import './profile.less';


class Profile extends Profile_Template {
    
    constructor(props){
        
        super(props);
        
        Profile.contextType = Context;

        let { components} = this.state;

        components["Profile Info"].component = this.Generate_Profile_Info;
        components["Connections"].component = this.Generate_Connections;
        components["Albums"].component = this.Generate_Albums;
        components["Posts"].component = this.Generate_Posts;

    }

    componentDidMount(){

        super.componentDidMount();

    }

    componentDidUpdate(prevProps, prevState){

        super.componentDidUpdate(prevProps, prevState);
        
    }

    Generate_Profile_Info = (general_props, unique_props)=>{

        return <Profile_Info_Editor {...general_props} {...unique_props} />;
    }

    Generate_Connections = (general_props, unique_props)=>{
        
        return <Connections_Editor {...general_props} {...unique_props} />;
    }   

    Generate_Albums = (general_props, unique_props)=>{    

        return <Album_Editor {...general_props} {...unique_props} />;
    }

    Generate_Posts = (general_props, unique_props)=>{

        return <Post_Editor {...general_props} {...unique_props}/>;
    }
    
    render(){
        
        //const { Profile_Template } = this.context;
        
        return (
            <div id="profile">

                {super.render()}

            </div>
        );
    }
}

export default Profile;
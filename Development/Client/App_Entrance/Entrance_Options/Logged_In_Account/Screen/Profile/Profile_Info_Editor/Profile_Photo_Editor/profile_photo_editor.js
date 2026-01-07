import React, {Component} from 'react';
import Editor from './Editor/editor.js';
import {Profile_Picture} from '@profile_template/profile_template.js';
import './profile_photo_editor.less';

class Profile_Photo_Editor extends Profile_Picture {
    
    constructor(props){
        
        super(props);
        
        let {owner_user_account} = this.props;
        
        this.state = {
            show_editor: false,
            owner_user_account,
            refresh_account_data: null
        };
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }

        
        
        this.setState(this.props);
    }
    
    Exit_Editor = () => {

        this.setState({ show_editor: false });

    }

    Render_Editor = ({})=>{

        const { owner_user_account, refresh_account_data } = this.state;

        return <Editor exit_editor={this.Exit_Editor} owner_user_account={owner_user_account} refresh_account_data={refresh_account_data} /> ;
    }
    
    render(){
        
        let {change_main_display} = this.props;
        
        return <div id="profile-photo-editor" className={`${this.state.show_editor ? "enlarged-profile-photo-editor" : ""}`}>
        
            <div id="editor-button" onClick={(e)=>{ change_main_display(this.Render_Editor); }} >
                
                Edit
                
            </div>

            {super.render()}

        </div>;
    }
}

export default Profile_Photo_Editor;
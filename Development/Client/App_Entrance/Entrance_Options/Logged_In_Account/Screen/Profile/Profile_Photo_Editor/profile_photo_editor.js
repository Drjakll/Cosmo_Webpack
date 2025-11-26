import React, {Component} from 'react';
import Editor from './Editor/editor.js';
import './profile_photo_editor.less';

class Profile_Photo_Editor extends Component {
    
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
    
    render(){
        
        const { owner_user_account, refresh_account_data } = this.state;
        
        return <div id="profile-photo-editor" className={`${this.state.show_editor ? "enlarged-profile-photo-editor" : ""}`}>

            {this.state.show_editor ? <Editor exit_editor={this.Exit_Editor} owner_user_account={owner_user_account} refresh_account_data={refresh_account_data} /> : <></>}
        
            <div id="editor-button" onClick={(e)=>{ this.setState({show_editor: true}); }} >
                
                Edit
                
            </div>
        
        </div>;
    }
}

export default Profile_Photo_Editor;
import React, {Component} from 'react';
import Profile_Photo_Editor from './Profile_Photo_Editor/profile_photo_editor.js';
import Profile_Data_Editor from './Profile_Data_Editor/profile_data_editor.js';
import Album_Editor from './Album_Editor/album_editor.js';
import Post_Editor from './Post_Editor/post_editor.js';
import Connections_Editor from './Connections_Editor/connections_editor.js';
import Context from '@context/context.js';
import './profile.less';

class Profile extends Component {
    
    constructor(props){
        
        super(props);
        
        Profile.contextType = Context;

        this.state = {
            owner_user_account: props.owner_user_account || {},
            connection_list: props.connection_list || {}
        }
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        let {owner_user_account, connection_list} = this.props;

        this.setState({owner_user_account, connection_list});
    }
    
    Generate_Profile_Photo_Editor = ({ owner_user_account, refresh_account_data }) => {
        
        return <Profile_Photo_Editor owner_user_account={owner_user_account} refresh_account_data={refresh_account_data} />;

    }
    
    render(){
        
        const { Profile_Template, Comment_Editor } = this.context;
        
        return (
            <div id="profile">

                <Profile_Template
                    owner_user_account={this.state.owner_user_account}
                    visitor_user_account={this.state.owner_user_account}
                    connection_list={this.state.connection_list}
                    add_editors={{
                        "Profile Info": {
                            profile_photo_editor: this.Generate_Profile_Photo_Editor,
                            profile_data_editor: Profile_Data_Editor,
                        },
                        "Albums": {
                            album_editor: Album_Editor
                        },
                        "Posts": {
                            post_editor: Post_Editor,
                            comment_editor: Comment_Editor
                        },
                        "Connections": {
                            connections_editor: Connections_Editor
                        }
                    }}
                />

            </div>
        );
    }
}

export default Profile;
import React, {Component} from 'react';
import Profile_Photo_Editor from './Profile_Photo_Editor/profile_photo_editor.js';
import Profile_Data_Editor from './Profile_Data_Editor/profile_data_editor.js';
import Album_Editor from './Album_Editor/album_editor.js';
import Post_Editor from './Post_Editor/post_editor.js';
import Connections_Editor from './Connections_Editor/connections_editor.js';
import './profile.less';

class Profile extends Component {
    
    constructor(props){
        
        super(props);
        
        Profile.contextType = window.Context;

        this.state = {
            account_data: props.account_data,
            connection_list: props.connection_list
        }
    }
    
    GetAccountData = async (UpdateAllComponentProps) => {
        
        this.profile_data = await window.LoginAttempt();
        
        this.setState({account_data: this.profile_data});
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        let {account_data, connection_list} = this.props;

        this.setState({account_data, connection_list});
    }
    
    Generate_Profile_Photo_Editor = ({ account_data, refresh_account_data }) => {
        
        return <Profile_Photo_Editor account_data={account_data} refresh_account_data={refresh_account_data} />;

    }
    
    render(){
        
        const { Profile_Template } = this.context;
        
        return (
            <div id="profile">

                <Profile_Template
                    account_data={this.state.account_data}
                    connection_list={this.state.connection_list}
                    get_account_data={this.GetAccountData}
                    add_editors={{
                        "Profile Info": {
                            profile_photo_editor: this.Generate_Profile_Photo_Editor,
                            profile_data_editor: Profile_Data_Editor,
                        },
                        "Albums": {
                            album_editor: Album_Editor
                        },
                        "Posts": {
                            post_editor: Post_Editor
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
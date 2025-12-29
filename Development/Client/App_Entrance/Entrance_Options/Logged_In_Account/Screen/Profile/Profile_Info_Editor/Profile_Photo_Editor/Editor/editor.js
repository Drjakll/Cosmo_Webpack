import React, {Component, createRef} from 'react';
import './editor.less';

class Editor extends Component {
    
    constructor(props){
        
        super(props);
        
        Editor.contextType = window.Context;
        
        let {owner_user_account} = this.props;
        
        this.state = {
            owner_user_account,
            profile_pictures: [],
            selected_to_delete: {}
        };
    }
    
    componentDidMount(){
        
        this.Get_All_Profile_Pictures();
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    Get_All_Profile_Pictures = async () => {
        
        let {Request_URLs} = this.context;
        
        let {get_photo_links} = Request_URLs;
        
        let {id: target_id} = this.state.owner_user_account;

        let target_type = "profile";
        
        let data = await (await fetch(get_photo_links, {
            method: "POST",
            body: JSON.stringify({target_id, target_type}),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
        
        if(data){
            
            this.setState({profile_pictures: data.results});
            
        }
    }

    Update_Profile_Photo = async (photo_info) => {

        let { set_photo_as_cover } = this.context.Request_URLs;

        let {profile_picture_id} = this.state.owner_user_account;

        let body = {
            last_cover_id: profile_picture_id ?? -1,
            photo_cover_id: photo_info?.id ?? -1
        };

        await fetch(set_photo_as_cover,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        );

        window.Refresh_Login();

    }

    Upload_Profile_Pictures = async (files) => {

        let {Upload_Files_To_S3} = this.context;
        let { upload_photos } = this.context.Request_URLs;
        let {id} = this.state.owner_user_account;

        let body = {
            user_id: id,
            target_id: id,
            album_name: "Profile_Picture",
            target_type: "profile"
        }

        await Upload_Files_To_S3(upload_photos, files, body);

        await this.Get_All_Profile_Pictures();
    }

    Select_To_Delete = (photo_data) => {

        if (!photo_data) {
            return;
        }

        let { selected_to_delete } = this.state;
        let { id } = photo_data;

        if (selected_to_delete[id]) {

            delete selected_to_delete[id];

        } else {

            selected_to_delete[id] = photo_data;
        }

        this.setState({ selected_to_delete });
    }

    Delete_Selections = async () => {

        let { selected_to_delete } = this.state;

        const { Request_URLs } = this.context;
        const { delete_photos } = Request_URLs;

        let body = { photos: selected_to_delete };

        await fetch(delete_photos,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        await this.Get_All_Profile_Pictures();

    }
    
    render(){
        
        let {profile_pictures} = this.state;
        let {Request_URLs} = this.context;
        
        let { aws_s3_url } = Request_URLs;

        let fileRef = createRef();
        
        return <div id="the-editor-profile-photo">
            
            <div id="the-profile-pictures-editor">

                <div id="profile-picture-collection-label">
            
                    Profile Pictures Collection

                </div>

                <div id="top">

                    <div id="upload-profile-pictures-wrapper">

                        <input type="file" ref={fileRef} accept="image/*" multiple={true}/>

                        <button onClick={(e) => {

                            this.Upload_Profile_Pictures(fileRef.current.files);

                        }}>Upload</button>

                    </div>

                    <div id="delete-selected-pictures-wrapper">

                        <button onClick={(e) => { this.Delete_Selections(); } }>Delete Selections</button>

                    </div>

                </div>
            
                <div id="profile-picture-collection">

                    {profile_pictures.map((photo_info, index)=>{

                        let {link, id} = photo_info;

                        let full_url = `${aws_s3_url}${link}`;

                        return <div className="individual-picture-wrapper" key={index}>

                                <div id="picture-wrapper">

                                    <div id="the-picture" style={{
                                        backgroundImage: `url('${full_url}')`
                                        }}
                                        onClick={(e) => { this.Select_To_Delete(photo_info); } }
                                        className={`${this.state.selected_to_delete[id] ? "delete-selected" : ""}`}
                                    >

                                    </div>

                            </div>

                            <div id="the-buttons">

                                <div id="set-as-profile-button" onClick={(e) => { this.Update_Profile_Photo(photo_info); }}>
                                    Set as Profile Picture
                                </div>
                                        
                            </div>

                        </div>;
                    })}

                </div>

            </div>
        
        </div>;
    }
}

export default Editor;
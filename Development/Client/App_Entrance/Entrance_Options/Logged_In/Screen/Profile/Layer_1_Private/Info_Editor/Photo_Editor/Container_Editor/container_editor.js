import React, {Component, createRef} from 'react';
import Popup_Msg from '@popup_message';
import Request_URLs from '@request_urls';
import Upload_Files_To_S3 from '@upload_files_to_s3';
import Image_Container from '@image_container';
import './container_editor.less';

class Editor extends Component {

    upload_in_progress = false;
    
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
        
        let {get_photo_links} = Request_URLs;
        
        let {id: target_id} = this.state.owner_user_account;

        let target_id_type = "profile_id";
        
        let data = await (await fetch(get_photo_links, {
            method: "POST",
            body: JSON.stringify({target_id, target_id_type}),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
        
        if(data){
            
            let {targets: profile_pictures} = data.results;

            for(let i = 0; i < profile_pictures.length; i++){

                profile_pictures[i].custom_frame = this.Custom_Regular_Frame;

            }

            this.setState({profile_pictures});
            
        }
    }

    Update_Profile_Photo = async (photo_info) => {

        let { set_photo_as_cover } = Request_URLs;

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

    upload_progress_added_keys = {};

    Update_Upload_Progress = ({key, url, progress_completed, all_completed}) => {

        if(all_completed){

            this.upload_progress_added_keys = {};

            return;
        }

        let {profile_pictures} = this.state;

        if(!this.upload_progress_added_keys[key]){

            this.upload_progress_added_keys[key] = true;

            let to_add = {id: key, link: url, completed: progress_completed};

            profile_pictures.push(to_add)
        }

        profile_pictures = profile_pictures.map((value, index)=>{

            if(value.id === key){
                value.completed = progress_completed;
            }

            return value;

        });

        this.setState({profile_pictures});

    }

    Upload_Profile_Pictures = async (files) => {

        let { upload_photos } = Request_URLs;
        let {id} = this.state.owner_user_account;

        let body = {
            user_id: id,
            target_id: id,
            album_name: "Profile_Picture",
            target_id_type: "profile_id"
        }

        await Upload_Files_To_S3(upload_photos, files, body, this.Update_Upload_Progress);

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

    Custom_Regular_Frame = ({photo})=>{

        const {aws_s3_url} = Request_URLs;

        let {link, id} = photo;

        let full_url = `${aws_s3_url}${link}`;

        return <div className="individual-picture-wrapper" key={id}>

            <div id="picture-wrapper">

                <img id="the-picture" src={`${full_url}`}
                    onClick={(e) => { 

                        let {currentTarget} = e;

                        currentTarget.classList.toggle("delete-selected");

                        this.Select_To_Delete(photo); 
                    }}
                    className={``}
                />

            </div>

            <div id="the-buttons">

                <div id="set-as-profile-button" onClick={(e) => { this.Update_Profile_Photo(photo); }}>
                    Set as Profile Picture
                </div>
                        
            </div>

        </div>;
    }
    
    fileRef = createRef();
    
    render(){
        
        let {profile_pictures} = this.state;
        
        let { aws_s3_url } = Request_URLs;
        
        return <div id="the-editor-profile-photo">
            
            <div id="the-profile-pictures-editor">

                <div id="profile-picture-collection-label">
            
                    Profile Pictures Collection

                </div>

                <div id="top">

                    <div id="upload-profile-pictures-wrapper">

                        <input type="file" ref={this.fileRef} accept="image/*" multiple={true}/>

                        <button onClick={async (e) => {

                            if(this.upload_in_progress){
                                Popup_Msg("message","Upload in progress, \nplease wait for it to finish \nbefore uploading more photos.");
                                return;
                            }

                            this.upload_in_progress = true;

                            await this.Upload_Profile_Pictures(this.fileRef.current.files);
                            
                            if(this.fileRef.current){
                                this.fileRef.current.value = "";
                            }

                            this.upload_in_progress = false;

                        }}>Upload</button>

                    </div>

                    <div id="delete-selected-pictures-wrapper">

                        <button onClick={(e) => { this.Delete_Selections(); } }>Delete Selections</button>

                    </div>

                </div>
            
                <div id="profile-picture-collection">

                    <Image_Container images={profile_pictures} />

                </div>

            </div>
        
        </div>;
    }
}

export default Editor;
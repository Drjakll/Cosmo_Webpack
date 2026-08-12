import React, { Component, createRef } from 'react';
import Photo_Thumbnail_Editor from './Photo_Thumbnail_Editor/photo_thumbnail_editor.js';
import Popup_Msg from '@popup_message';
import Album_Photos_Container from '@photos_container';
import Request_URLs from '@request_urls';
import Upload_Files_To_S3 from '@upload_files_to_s3';
import './photos_container_editor.less';



class Photos_Container_Editor extends Album_Photos_Container {

    Thumbnail = Photo_Thumbnail_Editor;

    constructor(props){
        
        super(props);
        
        let state = {
            selected_files: [],
            photos_to_be_deleted: {}
        };  
        
        this.Photos_To_Be_Deleted = {}
        
        for(let i in state){

            this.state[i] = state[i];

        }
    }

    Insert_Photo_To_Delete = (photo_info) => {

        if (this.Photos_To_Be_Deleted[photo_info.id]) {
            delete this.Photos_To_Be_Deleted[photo_info.id];
        } else {
            this.Photos_To_Be_Deleted[photo_info.id] = photo_info;
        }

        this.setState({photos_to_be_deleted: this.Photos_To_Be_Deleted});

    }

    Delete_Album_Button = () => {

        let delete_album = async (e) => {

            let { delete_album } = Request_URLs;

            let { owner_user_account, album_info } = this.state;

            let input = {input: ""};

            await Popup_Msg("input", "Enter the album's name to delete", input);

            if(!input.input){
                return;
            }

            if (input.input !== album_info.title) {
                await Popup_Msg("message","You entered the wrong album name!");
                return;
            }

            let param = {
                id: album_info.id,
                user_id: owner_user_account.id
            };

            await fetch(delete_album, {
                method: "POST",
                body: JSON.stringify(param),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            await this.props.Get_Albums();

            this.props.return_previous_display && this.props.return_previous_display();

        }

        return <div id="delete-album-button" onClick={delete_album}>
            Del Album
        </div>;
    }

    upload_progress_added_keys = {};

    Update_Upload_Progress = ({key, url, progress_completed, all_completed}) => {

        if(all_completed){

            this.upload_progress_added_keys = {};

            return;
        }

        let {photo_links} = this.state;

        if(!this.upload_progress_added_keys[key]){

            this.upload_progress_added_keys[key] = true;

            let to_add = {id: key, link: url, completed: progress_completed};

            photo_links.push(to_add)
        }

        photo_links = photo_links.map((value, index)=>{

            if(value.id === key){
                value.completed = progress_completed;
            }

            return value;

        });

        this.setState({photo_links});

    }

    Add_Photos_Button = () => {

        let upload_in_progress = false;

        let Upload = async (e) => {

            if(upload_in_progress){
                Popup_Msg("message","Upload in progress, \nplease wait for it to finish \nbefore uploading more photos.");
                return;
            }


            let { upload_photos } = Request_URLs;

            let { album_info, owner_user_account, selected_files } = this.state;

            let {title} = album_info;

            let {id} = owner_user_account;

            let jsonBody = { target_id: parseInt(album_info.id), target_id_type: "album_id", user_id: id, album_name: title };

            upload_in_progress = true;

            await Upload_Files_To_S3(upload_photos, selected_files, jsonBody, this.Update_Upload_Progress);

            upload_in_progress = false;

            let photo_links = await this.props.refresh_photo_links(album_info);

            photo_links = this.Modify_Photo_Links(photo_links);

            this.setState({selected_files: [], photo_links});

        }

        let Update_Selected_Files = (e)=>{

            let selected_files = e.target.files;

            this.setState({selected_files});
        }

        let {selected_files} = this.state;

        return <div id="add-photos-section">

            <div id="upload-photo-selections-wrapper">

                <input type="file" id="file-upload" multiple={true} accept="image/*" hidden={true} onChange={Update_Selected_Files}/>

                <label htmlFor="file-upload" id="upload-file-button">{selected_files.length || "Select" } file(s) {selected_files.length ? "selected" : ""}</label>

            </div>

            <div id="upload-button-wrapper">

                <button onClick={Upload}>Upload</button>

            </div>

        </div>;
    }

    Delete_Selected_Photos_Button = () => {


        let delete_photos = async (e) => {

            let confirm = {agree: false};

            await Popup_Msg("confirm", `Are you sure you wish to delete ${Object.keys(this.Photos_To_Be_Deleted).length} photos?`, confirm);

            if(!confirm.agree){
                return;
            }   


            let { delete_photos } = Request_URLs;

            let body = {
                photos: this.Photos_To_Be_Deleted
            };

            await fetch(delete_photos, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': "application/json"
                }
            });

            this.Photos_To_Be_Deleted = {};

            let photo_links = await this.props.refresh_photo_links(this.state.album_info);

            photo_links = this.Modify_Photo_Links(photo_links);

            this.setState({photos_to_be_deleted: {}, photo_links})
        };

        return <div id="delete-photo-button">

            <button onClick={delete_photos}>Del {Object.keys(this.state.photos_to_be_deleted).length} photo(s)</button>

        </div>;
    }

    Title_Editor = ()=>{

        let Change_Title = async (e)=>{

            let {title} = this.state.album_info;

            let input = {input: title, maxLength: 32};

            await Popup_Msg("input", "Insert a new title", input);

            if(!input.input){
                return;
            }

            let new_title = input.input;

            let {album_info, owner_user_account} = this.state;

            let {id} = owner_user_account;

            album_info.title = new_title;

            this.setState({album_info});

            let {update_album} = Request_URLs;

            let body = {
                user_id: id,
                id: album_info.id,
                album_info: {
                    title: new_title
                }
            };

            await fetch(update_album,
                {
                    method: "PATCH",
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': "application/json"
                    }
                }
            );
        }

        return <div id="title-editor" onClick={Change_Title}>
            Change Title
        </div>;
    }

    Description_Editor = ()=>{

        let Change_Description = async (e)=>{

            let {brief_description} = this.state.album_info;

            let input = {input: brief_description, maxLength: 256};

            await Popup_Msg("input", "Insert a new description", input);

            if(!input.input){
                return;
            }

            let new_description = input.input;

            let {album_info, owner_user_account} = this.state;

            let {id} = owner_user_account;

            album_info.brief_description = input.input;

            this.setState({album_info});

            let {update_album} = Request_URLs;

            let body = {
                user_id: id,
                id: album_info.id,
                album_info: {
                    brief_description: new_description
                }
            };

            await fetch(update_album,
                {
                    method: "PATCH",
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': "application/json"
                    }
                }
            );
        }

        return <div id="description-editor" onClick={Change_Description}>
            Change Description
        </div>;
    }
    
    render(){
        
        return <div id="photos-container-editor">
        
            <div id="editor-buttons-wrapper">

                <div id="album-management-delete-buttons-wrapper">

                    {this.Delete_Album_Button()}

                    {this.Delete_Selected_Photos_Button()}

                </div>

                <div id="album-management-edit-buttons-wrapper">

                    {this.Title_Editor()}

                    {this.Description_Editor()}

                    {this.Add_Photos_Button()}

                </div>

            </div>

            <div id="photos-container-editor-photos-wrapper">

                {super.render()}

            </div>
        
        </div>;
    }
    
}

export default Photos_Container_Editor;
import React, { Component, createRef } from 'react';
import Photo_Thumbnail_Editor from './Photo_Thumbnail_Editor/photo_thumbnail_editor.js';
import Context from '@context/context.js';
import Popup_Msg from '@popup_template/Popup_Message/popup_message.js';
import {Albums} from '@profile_template/profile_template.js';
import './photos_container_editor.less';

let {Photos_Container} = Albums.Photos_Container;

class Photos_Container_Editor extends Photos_Container {

    static contextType = Context;

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

    componentDidMount() {

        super.componentDidMount();
    }

    componentDidUpdate(prevProps, prevState) {

        super.componentDidUpdate(prevProps, prevState);

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

            let { delete_album } = this.context.Request_URLs;

            let { owner_user_account, album_info } = this.state;

            let input = {input: "", submit: false};

            await Popup_Msg("input", "Enter the album's name to delete", input);

            if(!input.submit){
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

    Add_Photos_Button = () => {

        let upload_in_progress = false;

        let Upload = async (e) => {

            if(upload_in_progress){
                Popup_Msg("message","Upload in progress, \nplease wait for it to finish \nbefore uploading more photos.");
                return;
            }

            let { Request_URLs, Upload_Files_To_S3 } = this.context;

            let { upload_photos } = Request_URLs;

            let { album_info, owner_user_account, selected_files } = this.state;

            let {title} = album_info;

            let {id} = owner_user_account;

            let jsonBody = { target_id: parseInt(album_info.id), target_id_type: "album_id", user_id: id, album_name: title };

            upload_in_progress = true;

            await Upload_Files_To_S3(upload_photos, selected_files, jsonBody);

            upload_in_progress = false;

            let photo_links = await this.props.refresh_photo_links(album_info);

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

            let { Request_URLs } = this.context;

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

            this.setState({photos_to_be_deleted: {}, photo_links})
        };

        return <div id="delete-photo-button">

            <button onClick={delete_photos}>Del {Object.keys(this.state.photos_to_be_deleted).length} photo(s)</button>

        </div>;
    }

    Title_Editor = ()=>{

        let Change_Title = async (e)=>{

            let input = {input: "", submit: false};

            await Popup_Msg("input", "Insert a new title", input);

            if(!input.submit){
                return;
            }

            let new_title = input.input;

            let {album_info, owner_user_account} = this.state;

            let {id} = owner_user_account;

            album_info.title = new_title;

            this.setState({album_info});

            let {update_album} = this.context.Request_URLs;

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

            let input = {input: "", submit: false, maxLength: 256};

            await Popup_Msg("input", "Insert a new description", input);

            if(!input.submit){
                return;
            }

            let new_description = input.input;

            let {album_info, owner_user_account} = this.state;

            let {id} = owner_user_account;

            album_info.brief_description = input.input;

            this.setState({album_info});

            let {update_album} = this.context.Request_URLs;

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
import React, { Component, createRef } from 'react';
import Photo_Thumbnail_Editor from './Photo_Thumbnail_Editor/photo_thumbnail_editor.js';
import './photos_container_editor.less';

class Photos_Container_Editor extends Component {

    static Photo_Thumbnail_Editor = Photo_Thumbnail_Editor

    Photos_To_Be_Deleted = {}

    constructor(props){
        
        super(props);

        Photos_Container_Editor.contextType = window.Context;
        
        this.state = {
            photo_links: [],
            owner_user_account: {},
            album_info: {}
        };    
    }

    componentDidMount() {

        this.setState(this.props);

        Photo_Thumbnail_Editor.Insert_Photo_To_Delete = this.Insert_Photo_To_Delete;
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        this.setState(this.props);
    }

    Insert_Photo_To_Delete = (photo_info) => {

        if (this.Photos_To_Be_Deleted[photo_info.id]) {
            delete this.Photos_To_Be_Deleted[photo_info.id];
        } else {
            this.Photos_To_Be_Deleted[photo_info.id] = photo_info;
        }

        this.props.Update_Photos_To_Be_Deleted(this.Photos_To_Be_Deleted);

    }

    Delete_Album_Button = () => {

        let delete_album = async (e) => {

            let { Request_URLs } = this.context;

            let { delete_photo_files, delete_photo_links, delete_album } = Request_URLs;

            let { photo_links, album_info } = this.state;

            let response = prompt("Enter the album's name to delete");

            if (response !== album_info.title) {
                return;
            }

            let param = {
                photos: photo_links
            };

            let res = await (await fetch(delete_photo_files, {
                method: "POST",
                body: JSON.stringify(param),
                headers: {
                    'Content-Type': 'application/json'
                }
            })).json();

            res = await (await fetch(delete_photo_links, {
                method: "POST",
                body: JSON.stringify(param),
                headers: {
                    'Content-Type': 'application/json'
                }
            })).json();

            res = await (await fetch(delete_album, {
                method: "POST",
                body: JSON.stringify(album_info),
                headers: {
                    'Content-Type': 'application/json'
                }
            })).json();

            this.props.Close_Photo_Album();

            this.props.Get_Albums();
        }

        return <div id="delete-album-button" onClick={delete_album}>
            Delete Album
        </div>;
    }

    Add_Photos_Button = () => {

        let uploadRef = createRef();

        let Upload = async (e) => {

            let { Request_URLs, Upload_Files_To_S3, Photo_Album_Data_Templates } = this.context;

            let { Photo_Data } = Photo_Album_Data_Templates;

            let { add_photo_links, upload_photos } = Request_URLs;

            let { album_info, owner_user_account } = this.state;

            let jsonBody = { email: owner_user_account.email, album: album_info.title };


            let res = await Upload_Files_To_S3(upload_photos, uploadRef.current.files, jsonBody);

            let photo_objs = [];

            for (let url of res.photo_urls) {

                let obj = Photo_Data({ owner_email: owner_user_account.email, link: url, belongs_to_album: album_info.id });

                photo_objs.push(obj);
            }

            res = await (await fetch(add_photo_links, {
                method: "POST",
                body: JSON.stringify(photo_objs),
                headers: {
                    'Content-Type': "application/json"
                }
            })).json();

            await this.props.Get_Photo_Links(album_info);

        }

        return <div id="add-photos-section">

            <div id="upload-photo-selections-wrapper">

                <input type="file" ref={uploadRef} multiple={true} accept="image/*" />

            </div>

            <div id="upload-button-wrapper">

                <button onClick={Upload}>Upload</button>

            </div>

        </div>;
    }

    Delete_Selected_Photos_Button = () => {

        let delete_photos = async (e) => {

            let { Request_URLs } = this.context;

            let { delete_photo_files, delete_photo_links } = Request_URLs;

            let param = {
                photos: this.Photos_To_Be_Deleted
            };

            let res = await (await fetch(delete_photo_files, {
                method: "POST",
                body: JSON.stringify(param),
                headers: {
                    'Content-Type': "application/json"
                }
            })).json()

            res = await (await fetch(delete_photo_links, {
                method: "POST",
                body: JSON.stringify(param),
                headers: {
                    'Content-Type': "application/json"
                }
            })).json();

            this.props.Get_Photo_Links(this.state.album_info);
        };

        return <div id="delete-photo-button">

            <button onClick={delete_photos}>Delete Selections</button>

        </div>;
    }
    
    render(){
        
        return <div id="photos-container-editor">
        
            <div id="editor-buttons-wrapper">

                {this.Delete_Album_Button()}

                {this.Add_Photos_Button()}

                {this.Delete_Selected_Photos_Button()}

            </div>
        
        </div>;
    }
    
}

export default Photos_Container_Editor;
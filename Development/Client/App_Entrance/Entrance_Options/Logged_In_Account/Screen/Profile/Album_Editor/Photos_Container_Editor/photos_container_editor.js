import React, { Component } from 'react';
import './photos_container_editor.less';

class Photos_Container_Editor extends Component {
    
    constructor(props){
        
        super(props);

        Photos_Container_Editor.contextType = window.Context;
        
        this.state = {
            photo_links: [],
            account_data: {},
            album_info: {}
        };    
    }

    componentDidMount() {

        this.setState(this.props);
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        for (let i in this.props) {
            this.state[i] = this.props[i];
        }

        this.setState(this.state);
    }

    DeleteAlbumButton = () => {

        let delete_album = async (e) => {

            let { Request_URLs } = this.context;

            let { delete_photo_files, delete_photo_links, delete_album } = Request_URLs;

            let { photo_links, album_info } = this.state;

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
        </div>
    }
    
    render(){
        
        return <div id="photos-container-editor">
        
            <div id="editor-buttons-wrapper">

                {this.DeleteAlbumButton()}

            </div>
        
        </div>;
    }
    
}

export default Photos_Container_Editor;
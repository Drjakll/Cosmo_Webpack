import React, { Component } from 'react';
//import Comment_Editor from './Comment_Editor/comment_editor.js';
import './enlarged_photo_editor.less';

class Enlarged_Photo_Editor extends Component {

    constructor(props){
        
        super(props);

        let { photo_info, album_info } = this.props;

        Enlarged_Photo_Editor.contextType = window.Context;
        
        this.state = {
            photo_info: photo_info,
            album_info: album_info
        };
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        this.setState(this.props);
    }

    Set_As_Album_Thumbnail_Button = (key) => {
 
        let set_album_thumbnail = async (e) => {

            let { Request_URLs } = this.context;

            let { update_album } = Request_URLs;

            let { album_info, photo_info } = this.state;

            album_info.cover_image_link = photo_info.link;

            let res = await (await fetch(
                update_album,
                {
                    method: "POST",
                    body: JSON.stringify(album_info),
                    headers: {
                        'Content-Type': "application/json"
                    }
                }
            )).json();


            this.props.Get_Albums();

        };

        return <div className="photo-button-wrapper" key={key}>

            <div id="the-button" onClick={set_album_thumbnail}>

                Set As Album Cover

            </div>

        </div>;
    }


    Button_Objs = [
        this.Set_As_Album_Thumbnail_Button
    ]
    
    render(){
        
        return <div id="enlarged-photo-editor">
        
            <div id="dropdown-menu">

                <label>Options</label>

                <div id="the-menu">

                    {this.Button_Objs.map((button, key) => {

                        return button(key);

                    })}

                </div>

            </div>
        
        </div>;
    }
    
}

export default Enlarged_Photo_Editor;
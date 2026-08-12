import React, { Component } from 'react';
import Enlarged_Single_Photo from '@enlarged_single_photo';
import Comments_Container_Editor from '@comments_container_editor';
import Request_URLs from '@request_urls';
import Popup_Msg from '@popup_message';
import './enlarged_photo_editor.less';


class Enlarged_Photo_Editor extends Enlarged_Single_Photo {

    Comments = Comments_Container_Editor;

    constructor(props){
        
        super(props);


    }

    componentDidMount(){

        super.componentDidMount();

    }

    componentDidUpdate(prevProps, prevState) {

        super.componentDidUpdate(prevProps, prevState);
    }

    Set_As_Album_Thumbnail_Button = (key) => {
 
        let set_album_thumbnail = async (e) => {

            let { set_photo_as_cover } = Request_URLs;

            let { album_info, photo_info } = this.state;

            let last_cover_id = album_info.album_cover_id;

            let photo_cover_id = photo_info?.id;

            let body = {
                last_cover_id,
                photo_cover_id
            }

            let data = await (await fetch(
                set_photo_as_cover,
                {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': "application/json"
                    }
                }
            )).json();

            this.props.Get_Albums && this.props.Get_Albums();

            Popup_Msg("message", data?.message);

        };

        return <div className="photo-button-wrapper" key={key}>

            <div id="the-button" onClick={set_album_thumbnail}>

                Set As Album Cover

            </div>

        </div>;
    }

    Render_Option_Buttons = () => {

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

    Button_Objs = [
        this.Set_As_Album_Thumbnail_Button
    ]
    
    render(){
        
        return super.render && super.render();
        
    }
    
}

export default Enlarged_Photo_Editor;
import React, { Component } from 'react';
import Context from '@context/context.js';
import {Albums} from '@profile_template';
import Comments_Container_Editor from '@logged_in_account/Universal_Components/Comments_Container_Editor/comments_container_editor.js';
import './enlarged_photo_editor.less';

let {Enlarged_Single_Photo} = Albums.Photos_Container.Single_Photo_Thumbnail;

class Enlarged_Photo_Editor extends Enlarged_Single_Photo {

    Comments = Comments_Container_Editor;

    constructor(props){
        
        super(props);

        Enlarged_Photo_Editor.contextType = Context;


    }

    componentDidMount(){

        super.componentDidMount();

    }

    componentDidUpdate(prevProps, prevState) {

        super.componentDidUpdate(prevProps, prevState);
    }

    Set_As_Album_Thumbnail_Button = (key) => {
 
        let set_album_thumbnail = async (e) => {

            let { set_photo_as_cover } = this.context.Request_URLs;

            let { album_info, photo_info } = this.state;

            let last_cover_id = album_info.album_cover_id;

            let photo_cover_id = photo_info?.id;

            let body = {
                last_cover_id,
                photo_cover_id
            }

            let res = await (await fetch(
                set_photo_as_cover,
                {
                    method: "POST",
                    body: JSON.stringify(body),
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
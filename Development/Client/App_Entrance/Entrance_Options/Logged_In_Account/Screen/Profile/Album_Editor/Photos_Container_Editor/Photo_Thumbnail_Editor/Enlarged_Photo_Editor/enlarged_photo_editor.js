import React, { Component } from 'react';
import Context from '@context/context.js';
import {Albums} from '@profile_template'
import './enlarged_photo_editor.less';

let {Enlarged_Single_Photo} = Albums.Photos_Container.Single_Photo_Thumbnail;

class Enlarged_Photo_Editor extends Enlarged_Single_Photo {

    constructor(props){
        
        super(props);

        let { photo_info, album_info } = this.props;

        Enlarged_Photo_Editor.contextType = Context;
        
        for(let i in this.props){
            this.state[i] = this.props[i];
        }
    }

    componentDidMount(){

        super.componentDidMount();
    }

    componentDidUpdate(prevProps, prevState) {

        super.componentDidUpdate(prevProps, prevState);
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
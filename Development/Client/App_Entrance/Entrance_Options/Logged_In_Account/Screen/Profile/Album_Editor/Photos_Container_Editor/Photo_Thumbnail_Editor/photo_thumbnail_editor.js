import React, { Component } from 'react';
import Enlarged_Photo_Editor from './Enlarged_Photo_Editor/enlarged_photo_editor.js';
import './photo_thumbnail_editor.less';

class Single_Photo_Thumbnail_Editor extends Component {

    static Enlarged_Photo_Editor = Enlarged_Photo_Editor

    constructor(props) {

        super(props);

        this.state = {
            photo_info: this.props.photo_info,
            photos_to_be_deleted: {}
        };
    }

    componentDidMount(){

        this.Insert_Photo_To_Delete = Single_Photo_Thumbnail_Editor.Insert_Photo_To_Delete;
        
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    render() {

        let { photos_to_be_deleted, photo_info } = this.state;

        return <div id="select-to-delete-button-wrapper">

            <div id="selected-to-delete-button" onClick={(e) => {

                this.Insert_Photo_To_Delete(photo_info);

            }}

                className={`${photos_to_be_deleted[photo_info.id] ? "selected-to-delete" : "" }`}
            >

                <div id="instruction">

                    Click to Select

                </div>

            </div>

        </div>;
    }
}

export default Single_Photo_Thumbnail_Editor;
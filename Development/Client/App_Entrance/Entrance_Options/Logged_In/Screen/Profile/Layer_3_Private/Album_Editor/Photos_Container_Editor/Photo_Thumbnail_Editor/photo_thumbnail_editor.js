import React, { Component } from 'react';
import Enlarged_Photo_Editor from './Enlarged_Photo_Editor/enlarged_photo_editor.js';
import Single_Photo from '@single_photo_thumbnail';
import './photo_thumbnail_editor.less';

class Single_Photo_Thumbnail_Editor extends Single_Photo {

    Enlarged_Single_Photo = Enlarged_Photo_Editor;

    constructor(props) {

        super(props);

        

    }

    componentDidMount(){

        super.componentDidMount();
        
    }

    componentDidUpdate(prevProps, prevState){

        super.componentDidUpdate(prevProps, prevState);
    }

    render() {

        let { photos_to_be_deleted, photo_info } = this.state;

        return <div id="photo-thumbnail"> 

            <div id="select-to-delete-button-wrapper">
                
                <div id="selected-to-delete-button" onClick={(e) => {

                        this.props.insert_photo_to_delete(photo_info);

                    }}

                    className={`${photos_to_be_deleted[photo_info.id] ? "selected-to-delete" : "" }`}
                >
                    <label>&#10004;</label>
                    
                    <div id="instruction">

                        Click to Select

                    </div>

                </div>

            </div>

            {super.render()}

        </div>;
    }
}

export default Single_Photo_Thumbnail_Editor;
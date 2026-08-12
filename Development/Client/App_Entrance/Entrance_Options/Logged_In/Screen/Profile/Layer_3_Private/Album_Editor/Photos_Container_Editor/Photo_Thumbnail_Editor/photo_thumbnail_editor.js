import React, { Component, createRef } from 'react';
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

    checkRef = createRef();

    render() {

        let { photos_to_be_deleted, photo_info } = this.state;

        return <div id="photo-thumbnail"> 

            <div id="select-to-delete-button-wrapper">
                
                <div id="selected-to-delete-button" onClick={(e) => {

                        let {currentTarget} = e;
                        let {current} = this.checkRef;

                        currentTarget.classList.toggle("selected-to-delete");

                        this.props.insert_photo_to_delete(photo_info);

                        if(!current){
                            return;
                        }

                        if(current.innerHTML !== ""){
                            current.innerHTML = "";
                        } else {
                            current.innerHTML = "&#10004;";
                        }

                    }}

                    className={``}
                >
                    <label ref={this.checkRef}></label>
                    
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
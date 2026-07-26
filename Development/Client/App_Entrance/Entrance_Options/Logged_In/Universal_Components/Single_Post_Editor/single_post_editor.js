import React from 'react';
import Single_Post from '@single_post';
import Comments_Container_Editor from '../Comments_Container_Editor/comments_container_editor.js';
import './single_post_editor.less';

class Single_Post_Editor extends Single_Post {

    Comments_Holder = Comments_Container_Editor

    constructor(props){

        super(props);
    }

    render(){

        return <div id="single-post-editor">

            {super.render()}


        </div>;
    }

}

export default Single_Post_Editor;
import React from 'react';
import Wall from '@wall';
import Comments_Container_Editor from '@comments_container_editor';
import './wall_editor.less';

class Wall_Editor extends Wall {
    
    The_Comments_Container = Comments_Container_Editor

    constructor(props){

        super(props);


    }

    render(){

        return <div id="wall-editor-wrapper">

            {super.render()}

        </div>;
    }
}

export default Wall_Editor;
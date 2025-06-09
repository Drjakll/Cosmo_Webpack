import React, {Component} from 'react';
import Photos_Container_Editor from './Photos_Container_Editor/photos_container_editor.js';

class Album_Editor extends Component {
    
    constructor(props){
        
        super(props);
        
    }
    
    render(){
        
        return <div id="album-editor">
        
            Hello
        
        </div>;
    }
    
}

Album_Editor.Photos_Container_Editor = Photos_Container_Editor;

export default Album_Editor;
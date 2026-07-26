import React from 'react';
import Connections from '@connections';
import Follow_Editor from './Follow_Editor/follow_editor.js';
import './connections_editor.less';

class Connections_Editor extends Connections {

    List = Follow_Editor
    
    constructor(props){
        
        super(props);


    }
    
    render(){
        
        return (
            <div id="connections-editor">

                {super.render()}

            </div>
        );
    }
}

export default Connections_Editor;
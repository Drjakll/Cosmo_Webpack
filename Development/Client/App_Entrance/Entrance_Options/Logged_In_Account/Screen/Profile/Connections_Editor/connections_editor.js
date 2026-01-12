import React from 'react';
import Context from '@context/context.js';
import Connections from '@profile_template/Components/Connections/connections.js';
import Following_Editor from './Following_Editor/following_editor.js';
import Followers_Editor from './Followers_Editor/followers_editor.js';
import './connections_editor.less';

class Connections_Editor extends Connections {

    static contextType = Context;

    Following = Following_Editor
    Followers = Followers_Editor
    
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
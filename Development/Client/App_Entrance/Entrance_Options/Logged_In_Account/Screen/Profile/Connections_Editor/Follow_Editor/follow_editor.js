import React from 'react';
import Context from '@context/context.js';
import Follow_List from '@profile_template/Components/Connections/Follow_List/follow_list.js';
import './follow_editor.less';

class Follow_Editor extends Follow_List {

    static contextType = Context
    
    constructor(props){
        
        super(props);


    }
    
    render(){
        
        return (
            <div id="follow-editor">

                {super.render()}

            </div>
        );
    }
}

export default Follow_Editor;
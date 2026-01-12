import React from 'react';
import Context from '@context/context.js';
import Following_List from '@profile_template/Components/Connections/Following_List/following_list.js';
import './following_editor.less';

class Following_Editor extends Following_List {

    static contextType = Context
    
    constructor(props){
        
        super(props);


    }
    
    render(){
        
        return (
            <div id="following-editor">

                {super.render()}

            </div>
        );
    }
}

export default Following_Editor;
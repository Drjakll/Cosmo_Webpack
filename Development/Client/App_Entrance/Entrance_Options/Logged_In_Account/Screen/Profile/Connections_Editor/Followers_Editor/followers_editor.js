import React from 'react';
import Context from '@context/context.js';
import Followers_List from '@profile_template/Components/Connections/Followers_List/followers_list.js';
import './followers_editor.less';

class Followers_Editor extends Followers_List {

    static contextType = Context
    
    constructor(props){
        
        super(props);


    }
    
    render(){
        
        return (
            <div id="followers-editor">

                {super.render()}

            </div>
        );
    }
}

export default Followers_Editor;
import React from 'react';
import Connection_List_Template from '@connection_list_template';
import './connection_list_editor.less';

class Connection_List_Editor extends Connection_List_Template {

    constructor(props){

        super(props);

    }

    render(){

        return <div id='connection-list-editor-wrapper'>

            {super.rendeR()}

        </div>;
    }
}

export default Connection_List_Editor;
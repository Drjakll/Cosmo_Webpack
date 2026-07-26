import React from 'react';
import Json_Text_Type from '@json_text_type';
import Json_Text_Screen_Editor from './Json_Text_Editor/json_text_editor.js';


class Json_Text_Editor extends Json_Text_Type {

    Json_Text_Screen_Component = Json_Text_Screen_Editor;

    constructor(props){

        super(props);

    }    

    render(){

        return <div id="json-text-editor-wrapper"> 

                {super.render()}

            </div>;
    }
}

export default Json_Text_Editor;
import React from 'react';
import Json_Text_Type from '@data_templates/Info_Types/Json_Text_Type/json_text_type.js';
import Json_Text_Screen_Editor from './Json_Text_Screen_Editor/json_text_screen_editor.js';


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
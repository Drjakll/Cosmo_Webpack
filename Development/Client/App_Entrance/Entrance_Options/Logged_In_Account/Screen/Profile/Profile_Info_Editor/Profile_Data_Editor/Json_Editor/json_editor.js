import React, { Component } from 'react';
import Context from '@context/context.js';
import Json_Type from '@data_templates/Info_Types/Json_Type/json_type.js';
import Json_Popup_Editor from './Json_Popup_Editor/json_popup_editor.js';
import './json_editor.less';

class Json_Editor extends Json_Type {

    Json_Popup = Json_Popup_Editor

    constructor(props) {

        super(props);

        Json_Editor.contextType = Context;


    }

    render() {


        return <div id="json-type-editor">

            {super.render()}
            
        </div>;
    }
}

export default Json_Editor;
import React, { Component } from 'react';
import Json_Type from '@json_type';
import Json_Popup_Editor from './Json_Popup_Editor/json_popup_editor.js';
import './json_editor.less';

class Json_Editor extends Json_Type {

    Json_Popup = Json_Popup_Editor

    constructor(props) {

        super(props);



    }

    render() {


        return <div id="json-type-editor">

            {super.render()}
            
        </div>;
    }
}

export default Json_Editor;
import React, { Component } from 'react';
import Context from '@context/context.js';
import Text_Type from '@data_templates/Info_Types/Text_Type/text_type.js';
import './text_editor.less';

class Text_Editor extends Text_Type {

    constructor(props) {

        super(props);

        Text_Editor.contextType = Context;


    }

    componentDidMount(){

        super.componentDidMount();

    }

    render() {


        return <div id="text-type-editor">

            {super.render()}
            
        </div>;
    }
}

export default Text_Editor;
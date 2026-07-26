import React, { Component } from 'react';
import Text_Type from '@text_type';
import './text_editor.less';

class Text_Editor extends Text_Type {

    constructor(props) {

        super(props);



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
import React from 'react';
import Post_Editor from './Post_Editor/post_editor.js';
import Wall_Editor from './Wall_Editor/wall_editor.js';
import Layer_2 from '@layer_2';
import './layer_2_private.less';

class Layer_2_Private extends Layer_2 {

    constructor(props){

        super(props);

        let {render_list} = this.state;

        render_list["The Posts"].component = Post_Editor;
        render_list["The Wall"].component = Wall_Editor;
    }

    render(){

        return <div id="layer_2-private-wrapper">

            {super.render()}

        </div>;

    }
}

export default Layer_2_Private;
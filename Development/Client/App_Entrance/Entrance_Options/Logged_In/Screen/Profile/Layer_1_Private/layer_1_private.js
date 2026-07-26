import React from 'react';
import Profile_Info_Editor from './Info_Editor/info_editor.js';
import Connections_Editor from './Connections_Editor/connections_editor.js';
import Layer_1 from '@layer_1';
import './layer_1_private.less';

class Layer_1_Private extends Layer_1 {


    constructor(props){

        super(props);

        let render_list = this.state.render_list;

        render_list["Profile_Info"].component = Profile_Info_Editor;
        render_list["Connections"].component = Connections_Editor;

    }

    render(){

        return <div id="layer_1-private-wrapper">

            {super.render()}

        </div>;

    }
}

export default Layer_1_Private;
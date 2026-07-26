import React from 'react';
import Album_Editor from './Album_Editor/album_editor.js';
//import Layer_3 from '@root/View_Templates/Profile_Template/Components/Layer_3/layer_3.js';
import Layer_3 from '@layer_3';
import './layer_3_private.less';


class Layer_3_Private extends Layer_3 {


    constructor(props){

        super(props);

        this.state.render_list = this.Render_List;

        let {render_list} = this.state;

        render_list["Album"].component = Album_Editor;

    }

    render(){

        return <div id="layer_3-private-wrapper">

            {super.render()}

        </div>;

    }
}

export default Layer_3_Private;
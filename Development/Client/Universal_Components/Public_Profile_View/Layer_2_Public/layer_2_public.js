import React from 'react';
import Posts_Public from './Posts_Public/posts_public.js';
import Layer_2 from '@layer_2';
import './layer_2_public.less';

class Layer_2_Public extends Layer_2 {

    constructor(props){

        super(props);

        let {render_list} = this.state;

        render_list["The Posts"].component = Posts_Public;
        
    }

    render(){

        return <div id="layer_2-public-wrapper">

            {super.render()}

        </div>

    }
}

export default Layer_2_Public;
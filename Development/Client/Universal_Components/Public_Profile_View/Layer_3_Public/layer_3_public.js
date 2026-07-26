import React from 'react';
import Albums_Public from './Albums_Public/albums_public.js';
import Layer_3 from '@layer_3';
import './layer_3_public.less';

class Layer_3_Public extends Layer_3 {

    constructor(props){

        super(props);

        let {render_list} = this.state;

        render_list["Album"].component = Albums_Public;

    }

    render(){

        return <div id="layer_3-public-wrapper">

            {super.render()}

        </div>;

    }
}

export default Layer_3_Public;
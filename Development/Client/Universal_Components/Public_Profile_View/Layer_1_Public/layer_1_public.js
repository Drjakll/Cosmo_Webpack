import React from 'react';
import Profile_Info_Public from './Profile_Info_Public/profile_info_public.js';
import Connections_Public from './Connections_Public/connections_public.js';
import Layer_1 from '@layer_1';
import './layer_1_public.less';

class Layer_1_Public extends Layer_1 {

    constructor(props){

        super(props);

        let {render_list} = this.state;

        render_list["Profile_Info"].component = Profile_Info_Public;
        render_list["Connections"].component = Connections_Public;
    }

    render(){

        return <div id="layer_1-public-wrapper">

            {super.render()}

        </div>
    }
}

export default Layer_1_Public;
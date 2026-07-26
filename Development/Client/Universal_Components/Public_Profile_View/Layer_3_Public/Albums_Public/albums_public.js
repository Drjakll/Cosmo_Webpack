import React from 'react';
import Albums from '@albums';
import './albums_public.less';

class Albums_Public extends Albums {

    constructor(props){

        super(props);

    }

    render(){

        return <div id="albums-public-wrapper">

            {super.render()}

        </div>

    }
}

export default Albums_Public;
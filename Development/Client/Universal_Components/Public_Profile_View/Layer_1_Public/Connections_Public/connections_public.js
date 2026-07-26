import React from 'react';
import Connections from '@connections';
import './connections_public.less';

class Connections_Public extends Connections {

    constructor(props){

        super(props);
        
    }

    render(){

        return <div id="connections-public-wrapper">

            {super.render()}

        </div>
    }
}

export default Connections_Public;
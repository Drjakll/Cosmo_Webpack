import React, {Component} from 'react';
import Connection_List_Template from '../Connection_List_Template/connection_list_template.js';
import './following_list.less';

class Following_List extends Connection_List_Template {

    constructor(props){

        super(props);

    }

    render(){

        let {list} = this.state;

        return <div id="following-connection-list-wrapper">

            <div id="following-label">
                {list.length} Following
            </div>

            {super.render()}

        </div>;
    }
}

export default Following_List;
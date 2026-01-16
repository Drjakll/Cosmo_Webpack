import React, {Component} from 'react';
import Connection_List_Template from '../Connection_List_Template/connection_list_template.js';
import './follow_list.less';

class Follow_List extends Connection_List_Template {

    constructor(props){

        super(props);

    }

    render(){

        let {label} = this.props;
        let {list} = this.state;

        return <div id="following-connection-list-wrapper">

            <div id="following-label">

                {list.length} {label}
                
            </div>

            <div id="connection-list-container">

                {super.render()}

            </div>

        </div>;
    }
}

export default Follow_List;
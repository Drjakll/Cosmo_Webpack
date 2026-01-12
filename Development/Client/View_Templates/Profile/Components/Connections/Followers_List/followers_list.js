import React, {Component} from 'react';
import Connection_List_Template from '../Connection_List_Template/connection_list_template.js';
import './followers_list.less';

class Followers_List extends Connection_List_Template {

    constructor(props){

        super(props);

    }

    render(){

        let {list} = this.state;

        return <div id="follower-connection-list-wrapper">

            <div id="follower-label">
                {list.length} Followers
            </div>

            {super.render()}

        </div>;
    }
}

export default Followers_List;
import React, {Component} from 'react';
import Connection_List_Template from '../Connection_List_Template/connection_list_template.js';
import './following_list.less';

class Following_List extends Connection_List_Template {

    constructor(props){

        super(props);

        this.state = {

        };
    }

    componentDidMount(){


    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

    }

    render(){


        return <div id="">



        </div>;
    }
}

export default Following_List;
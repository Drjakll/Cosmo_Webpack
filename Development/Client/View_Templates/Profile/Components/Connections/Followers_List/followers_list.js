import React, {Component} from 'react';
import Connection_List_Template from '../Connection_List_Template/connection_list_template.js';
import './followers_list.less';

class Followers_List extends Connection_List_Template {

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

export default Followers_List;
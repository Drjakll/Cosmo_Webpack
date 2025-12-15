import React, {Component} from 'react';
import './connection_list_template.less';

class Connection_List_Template extends Component {

    constructor(props){

        super(props);


        this.state = {};
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

        return <div id="connection-list-template">

            

        </div>;
    }
}

export default Connection_List_Template;
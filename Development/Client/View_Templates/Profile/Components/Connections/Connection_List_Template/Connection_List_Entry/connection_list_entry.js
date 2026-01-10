import React, {Component} from 'react';
import './connection_list_entry.less';

class Connection_Entry_Template extends Component {

    constructor(props){

        super(props);

        let {entry} = props;

        this.state = {
            entry
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

        let {entry} = this.state;

        let {first_name, last_name, profile_picture_link} = entry;

        return <div id="connection-list-entry-wrapper">



        </div>;
    }
}

export default Connection_Entry_Template;
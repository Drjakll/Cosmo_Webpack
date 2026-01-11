import React, {Component} from 'react';
import Context from '@context/context.js';
import './connection_list_entry.less';

class Connection_Entry_Template extends Component {

    static contextType = Context

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

        let {aws_s3_url} = this.context.Request_URLs;

        return <div id="connection-list-entry-wrapper">

            <div id="profile-picture-wrapper">

                <img src={`${aws_s3_url}${profile_picture_link}`} />

            </div>

        </div>;
    }
}

export default Connection_Entry_Template;
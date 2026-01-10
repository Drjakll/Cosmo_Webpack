import React, {Component} from 'react';
import './connection_list_template.less';

class Connection_List_Template extends Component {

    constructor(props){

        super(props);

        //The list is either followings, or followers
        //The label will tell whether it's followings or followers
        let {list, label, owner_user_account, visitor_user_account} = props;

        this.state = {
            label,
            list,
            owner_user_account,
            visitor_user_account
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

        let {label, list} = this.state;

        return <div id="connection-list-template">

            <div id="label-wrapper">

                <label>{label}</label>

            </div>

            <div id="the-list-wrapper">

                

            </div>

        </div>;
    }
}

export default Connection_List_Template;
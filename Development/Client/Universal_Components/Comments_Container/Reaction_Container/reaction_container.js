import React, {Component} from 'react';
import './reaction_container.less';

class Reaction_Container extends Component {

    Reaction_Icon_Names = [
        "angry",
        "laugh",
        "sad",
        "surprised",
        "sympathetic",
        "passionate"
    ]

    constructor(props){
        
        super(props);

        let {owner_user_account, visitor_user_account} = props;

        this.state = {
            owner_user_account,
            visitor_user_account
        };

    }

    render(){

        return <div id="reaction-container-wrapper">

            

        </div>;
    }
}

export default Reaction_Container;
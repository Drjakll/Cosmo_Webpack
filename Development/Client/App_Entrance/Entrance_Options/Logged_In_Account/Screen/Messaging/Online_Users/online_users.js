import React, {Component} from 'react';
import './online_users.less';

class Online_Users extends Component {

    constructor(props){
        
        super(props);

        this.state = {
        };  
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    render(){

        return (
                <div id="online-users">

                    
                    
                </div>
            );
    }
}

export default Online_Users;
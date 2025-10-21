import React, {Component} from 'react';
import './connection_channel.less';

class Connection_Channel extends Component {

    constructor(props){
        
        super(props);

        let {connection_list, account_data} = this.props;

        this.state = {
            connection_list,
            account_data
        };  
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    Update_Visible_Users = (e)=>{

        let {update_visible_users} = this.props;

        update_visible_users(this.state.connection_list);
    }

    render(){

        return (
                <div id="connection-channel" onClick={this.Update_Visible_Users}>

                    <label>Connections</label>
                    
                </div>
            );
    }
}

export default Connection_Channel;
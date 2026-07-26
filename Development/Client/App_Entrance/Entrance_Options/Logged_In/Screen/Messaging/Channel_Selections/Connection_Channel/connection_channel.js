import React, {Component} from 'react';
import './connection_channel.less';

class Connection_Channel extends Component {

    constructor(props){
        
        super(props);

        let {following_list, owner_user_account, channel_selected} = this.props;

        this.state = {
            following_list,
            owner_user_account,
            channel_selected
        };  
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

        let {following_list} = this.props;

        if(following_list !== prevProps.following_list){
            this.props.switch_channel(following_list, "connections", "public");
        }
    }

    Switch_Channel = (e)=>{

        let {switch_channel} = this.props;

        switch_channel(this.state.following_list, "connections", "public");
    }

    render(){

        return (
                <div id="connection-channel" onClick={this.Switch_Channel} className={`${this.state.channel_selected === "connections" ? "selected-channel" : ""}`}>

                    <label>Connections</label>
                    
                </div>
            );
    }
}

export default Connection_Channel;
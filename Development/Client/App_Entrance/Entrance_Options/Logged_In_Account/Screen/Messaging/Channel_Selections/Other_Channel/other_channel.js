import React, {Component} from 'react';
import './other_channel.less';

class Other_Channel extends Component {

    constructor(props){
        
        super(props);

        let {channel_name, online_users} = this.props;

        this.state = {
            channel_name,
            online_users
        };  
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }
    
    Switch_Channel = ()=>{

        let {online_users, channel_name} = this.state;

        this.props.switch_channel(online_users, channel_name, "public");

    }

    render(){

        return (
                <div id="other-channel" onClick={this.Switch_Channel}>

                    <label>{this.state.channel_name}</label>
                    
                </div>
            );
    }
}

export default Other_Channel;
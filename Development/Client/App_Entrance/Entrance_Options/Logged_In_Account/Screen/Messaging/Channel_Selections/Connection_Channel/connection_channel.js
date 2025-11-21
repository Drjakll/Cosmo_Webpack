import React, {Component} from 'react';
import './connection_channel.less';

class Connection_Channel extends Component {

    constructor(props){
        
        super(props);

        let {connection_list, account_data, channel_selected} = this.props;

        this.state = {
            connection_list,
            account_data,
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

        let {channel_selected, connection_list} = this.props;

        if(JSON.stringify(connection_list) !== JSON.stringify(prevProps.connection_list)){
            this.props.switch_channel(connection_list, "connections", "public");
        }
    }

    Switch_Channel = (e)=>{

        let {switch_channel} = this.props;

        switch_channel(this.state.connection_list, "connections", "public");
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
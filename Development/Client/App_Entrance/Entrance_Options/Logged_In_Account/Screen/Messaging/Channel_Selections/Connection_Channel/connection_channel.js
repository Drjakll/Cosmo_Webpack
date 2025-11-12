import React, {Component} from 'react';
import './connection_channel.less';

class Connection_Channel extends Component {

    constructor(props){
        
        super(props);

        let {connection_list, account_data, selected} = this.props;

        this.state = {
            connection_list,
            account_data,
            selected
        };  
    }

    componentDidMount(){

        //this.props.switch_channel(this.state.connection_list, "connections");

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    Switch_Channel = (e)=>{

        let {switch_channel} = this.props;

        switch_channel(this.state.connection_list, "connections", "private");
    }

    render(){

        return (
                <div id="connection-channel" onClick={this.Switch_Channel} className={`${this.state.selected ? "selected-channel" : ""}`}>

                    <label>Connections</label>
                    
                </div>
            );
    }
}

export default Connection_Channel;
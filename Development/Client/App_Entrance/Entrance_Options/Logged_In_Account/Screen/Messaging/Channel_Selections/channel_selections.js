import React, {Component} from 'react';
import Connection_Channel from './Connection_Channel/connection_channel.js';
import Other_Channel from './Other_Channel/other_channel.js';
import Join_Channel_Options from './Join_Channel_Options/join_channel_options.js';
import './channel_selections.less';

class Channel_Selections extends Component {

    Channel_Types = {
        other: Other_Channel
    }

    constructor(props){
        
        super(props);

        let {connection_list, account_data} = this.props;

        this.state = {
            connection_list,
            account_data,
            channels: {}, //example: {'Channel 1': {type: 'other', users: {}, callback: function(){}, channel_name: 'Channel 1'}}
            show_join_channel: false
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

    Add_Channel = (channel_name, users)=>{

        let {channels} = this.state;
        let {update_visible_users} = this.props;

        channels[channel_name] ={
            type: 'other',
            users: users,
            callback: update_visible_users,
            channel_name: channel_name
        };

        this.setState({
            channels
        });
    }

    Show_Join_Channel = (e)=>{

        this.setState({
            show_join_channel: !this.state.show_join_channel
        });

    }

    render(){

        let {channels, show_join_channel} = this.state;

        return (
                <div id="channel-selections">

                    {show_join_channel ? <Join_Channel_Options exit={this.Show_Join_Channel} /> : ""}

                    <div id="available-channels">

                        {/* this will always stay here */}
                        <div className="channel-button-wrapper">
            
                            <Connection_Channel
                                connection_list={this.state.connection_list}
                                account_data={this.state.account_data}
                                update_visible_users={this.props.update_visible_users}
                            />

                        </div>

                        {Object.keys(channels).map((key)=>{

                            let channel_data = channels[key];
                            
                            let {type, users, callback, channel_name} = channel_data;

                            const Channel_Button = this.Channel_Types[type];

                            return <div className="channel-button-wrapper" key={key}>

                                <Channel_Button 
                                    connection_list={users} 
                                    account_data={this.state.account_data}
                                    update_visible_users={callback}
                                    channel_name={channel_name}
                                />

                            </div>;

                        })}

                    </div>

                    <div id="join-channel-button-wrapper">

                        <div id="join-channel-button" onClick={this.Show_Join_Channel}> + </div>

                    </div>
                    
                </div>
            );
    }
}

export default Channel_Selections;
import React, {Component} from 'react';
import Connection_Channel from './Connection_Channel/connection_channel.js';
import Other_Channel from './Other_Channel/other_channel.js';
import Join_Channel_Options from './Join_Channel_Options/join_channel_options.js';
import './channel_selections.less';

class Channel_Selections extends Component {

    constructor(props){
        
        super(props);

        let {connection_list, owner_user_account, public_channels, selected_channel, msg_socket, public_channels_search_results} = this.props;

        this.state = {
            connection_list,
            owner_user_account,
            public_channels, //example: {'Channel 1': {channel_name: 'Channel 1'}}
            show_join_channel: false, // A trigger for opening options for creating/joining a channel
            selected_channel,
            msg_socket,
            public_channels_search_results 
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

        let {public_channels, show_join_channel} = this.state;

        return (
                <div id="channel-selections">

                    {show_join_channel ? 
                    <Join_Channel_Options 
                        exit={this.Show_Join_Channel} 
                        join_public_channels={this.props.join_public_channels} 
                        msg_socket={this.state.msg_socket}
                        public_channels_search_results={this.state.public_channels_search_results}
                    /> 
                    : ""}

                    <div id="available-channels">

                        {/* this is fixed */}
                        <div className="channel-button-wrapper">
            
                            <Connection_Channel
                                connection_list={this.state.connection_list}
                                owner_user_account={this.state.owner_user_account}
                                switch_channel={this.props.switch_channel}
                                channel_selected={this.state.selected_channel}
                            />

                        </div>

                        {Object.keys(public_channels).sort().map((key)=>{

                            let channel_data = public_channels[key];
                            
                            let {channel_name, online_users} = channel_data;

                            return <div className="channel-button-wrapper" key={key}>

                                <Other_Channel 
                                    owner_user_account={this.state.owner_user_account}
                                    channel_name={channel_name}
                                    online_users={online_users}
                                    selected={this.state.selected_channel === channel_name ? true : false}
                                    switch_channel={this.props.switch_channel}
                                    set_msg_area_user_info={this.props.set_msg_area_user_info}
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
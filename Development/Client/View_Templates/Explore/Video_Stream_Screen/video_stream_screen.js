import React, {Component} from 'react';
import Streaming from './Streaming/streaming.js';
import Prepare_To_Stream from './Prepare_To_Stream/prepare_to_stream.js';
import './video_stream_screen.less';


class Video_Stream_Screen extends Component {
    
    Screens = {
        "Streaming": Streaming,
        "Prepare_To_Stream": Prepare_To_Stream
    };
    
    constructor(props){
        
        super(props);

        this.state = {
            account_data: this.props.account_data,
            //If stream_id exists, jump directly to streaming; if no stream_id exists, jump to prepare to stream
            current_screen: this.props.stream_id ? "Streaming" : "Prepare_To_Stream",
            is_host: this.props.is_host,
            stream_id: this.props.stream_id,
            stream_socket: this.props.stream_socket
        };
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(prevProps === this.props){
            return;
        }
        
        this.setState(this.props);
    }
    
    Change_Screen = (screen, is_hosting = false) => {
        
        this.setState({current_screen: screen, is_host: is_hosting});
        
    }
    
    render(){
        
        const Com = this.Screens[this.state.current_screen];
        
        return (
                <div id="video-stream-screen">
                    
                <Com account_data={this.state.account_data}
                    change_screen={this.Change_Screen}
                    is_host={this.state.is_host}
                    stream_id={this.state.stream_id}
                    set_main_screen={this.props.set_current_screen}
                    stream_socket={this.state.stream_socket}
                    />
                    
                </div>
            );
    }
}

export default Video_Stream_Screen;
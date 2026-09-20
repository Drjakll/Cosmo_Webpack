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

        const {
            owner_user_account,
            stream_id,
            is_host,
            stream_socket,
            stream_title,
            turn_server_cred
        } = props;

        this.state = {
            owner_user_account: owner_user_account,
            //If stream_id exists, jump directly to streaming; if no stream_id exists, jump to prepare to stream
            current_screen: stream_id ? "Streaming" : "Prepare_To_Stream",
            is_host: is_host,
            stream_id: stream_id,
            stream_socket: stream_socket,
            stream_title,
            turn_server_cred
        };
    }

    async componentDidMount(){

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

    Update_Stream_Title = (title) => {
        this.setState({stream_title: title});
    }

    render(){
        
        const {
            turn_server_cred, 
            is_host, 
            stream_id, 
            stream_socket, 
            stream_title, 
            owner_user_account,
            current_screen
        } = this.state;

        const {
            set_current_screen,
        } = this.props;

        const Com = this.Screens[current_screen];
        
        return (
                <div id="video-stream-screen">
                    
                    <Com owner_user_account={owner_user_account}
                        change_screen={this.Change_Screen}
                        root_change_screen={set_current_screen}
                        is_host={is_host}
                        stream_id={stream_id}
                        set_main_screen={set_current_screen}
                        stream_socket={stream_socket}
                        update_stream_title={this.Update_Stream_Title}
                        stream_title={stream_title}
                        turn_server_cred={turn_server_cred}
                        />
                        
                </div>
            );
    }
}

export default Video_Stream_Screen;
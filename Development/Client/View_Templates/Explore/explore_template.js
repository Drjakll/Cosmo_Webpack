import React, {Component} from 'react';
import Stream_List_Components from './Stream_List_Components/stream_list_components.js';
import Video_Stream_Screen from './Video_Stream_Screen/video_stream_screen.js';
import { io } from 'socket.io-client';
import './explore_template.less';

class Explore_Template extends Component {
    
    Screen = {
        "Stream_List_Components": Stream_List_Components,
        "Video_Stream_Screen": Video_Stream_Screen
    };
    
    constructor(props){
        
        super(props);
        
        this.state = {
            owner_user_account: this.props.owner_user_account,
            current_screen: "Stream_List_Components",
            is_host: false,
            stream_id: null,
            socket: this.Init_Socket(),
            active_streams: {},
            search_criteria: {}
        };

    }
    
    componentDidMount(){

    }

    componentWillUnmount(){
        this.socket.disconnect();
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    Set_Current_Screen = (screen, is_hosting = false, stream_id = null) => {
        
        this.setState({current_screen: screen, is_host: is_hosting, stream_id: stream_id});
        
    }

    //Intended to be called before the component is mounted
    Init_Socket = () => {
        
        this.socket = io('/video_streams');

        this.socket?.on('connect', () => {

            if (!this.socket.id) {
                return;
            }
            
            this.Gather_Stream_List({});
            
        });
        
        this.socket?.on('catch_streams', ({ streams })=>{
            
            this.setState({
                active_streams: streams
            });
            
        });
        
        this.socket?.on('update_stream_list', ({ streams })=>{
            
            this.socket.emit("request_streams", this.state.search_criteria);
            
        });

        return this.socket;
        
    }
    
    Gather_Stream_List = (search_parameters) => {
        
        this.socket?.emit('request_streams', search_parameters);

        this.setState({search_criteria: search_parameters});
        
    }
    
    render(){
        
        const Com = this.Screen[this.state.current_screen];
        
        return (
            <div id="explore-template">

                <Com owner_user_account={this.state.owner_user_account} 
                    set_current_screen={this.Set_Current_Screen} 
                    is_host={this.state.is_host}
                    stream_id={this.state.stream_id}
                    stream_socket={this.state.socket}
                    active_streams={this.state.active_streams}
                    search_streams={this.Gather_Stream_List}
                />

            </div>
        );
    }
}

export default Explore_Template;
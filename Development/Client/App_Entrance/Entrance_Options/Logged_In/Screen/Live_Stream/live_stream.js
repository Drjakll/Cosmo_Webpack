import React, {Component} from 'react';
import Stream_List_Components from './Stream_List_Components/stream_list_components.js';
import Video_Stream_Screen from './Video_Stream_Screen/video_stream_screen.js';
import init_websocket from '@init_websocket';
import './live_stream.less';

class Live_Stream extends Component {
    
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
        this.socket?.disconnect();
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
        
        this.socket = init_websocket('/video_streams', this.Init_Socket);

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
            
            this.socket?.emit("request_streams", this.state.search_criteria);
            
        });

        return this.socket;
        
    }

    Update_Search_Criteria = (new_criteria) => {

        this.setState({search_criteria: new_criteria});
    }
    
    Gather_Stream_List = () => {

        let {search_criteria: search_parameters} = this.state;
        
        this.socket?.emit('request_streams', search_parameters);
        
    }
    
    render(){

        let {active_streams, socket, stream_id, is_host, owner_user_account, current_screen} = this.state;
        
        const Com = this.Screen[current_screen];
        
        return (
            <div id="live-stream-wrapper">

                <Com owner_user_account={owner_user_account} 
                    set_current_screen={this.Set_Current_Screen} 
                    is_host={is_host}
                    stream_id={stream_id}
                    stream_socket={socket}
                    active_streams={active_streams}
                    search_streams={this.Gather_Stream_List}
                    update_search_criteria={this.Update_Search_Criteria}
                />

            </div>
        );
    }
}

export default Live_Stream;
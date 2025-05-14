import React, {Component} from 'react';
import Individual_Stream_Thumbnail from './Individual_Stream_Thumbnail/individual_stream_thumbnail.js';
import './stream_displays.less';
import { io } from 'socket.io-client';

class Stream_Displays extends Component {

    
    constructor(props){
        
        super(props);
        
        this.state = {
            active_streams: {},
            properties: this.props.properties
        };

    }
    
    componentDidMount() {
        
        this.Init_Socket();
        
    }
    
    Init_Socket = () => {
        
        this.socket = io('/video_streams');
        
        this.socket?.on('connect', ()=>{
            
            if(!this.socket.id){
                return;
            }
            
            this.Gather_Stream_List();
            
        });
        
        this.socket?.on('catch_streams', ({ streams })=>{
            
            this.setState({
                active_streams: streams
            });
            
        });
        
        this.socket?.on('update_stream_list', ({ streams })=>{
            
            this.setState({
                active_streams: streams
            });
            
        });
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(prevProps === this.props){
            return;
        }
        
        this.setState(this.props);
        
        
    }
    
    Gather_Stream_List = () => {
        
        this.socket?.emit('request_streams', {});
        
    }
    
    render(){
        
        return (
                <div id="stream-displays">
                    
                    <div id="thumbnails-wrapper">
                    
                        {Object.keys(this.state.active_streams).map((key, index)=>{

                            let stream_info = this.state.active_streams[key];

                            return <div className="thumbnail-wrapper" key={index}>

                                <Individual_Stream_Thumbnail 
                                    image_link={stream_info.thumbnail_link} 
                                    title={stream_info.room_title}
                                    stream_id={stream_info.stream_id}
                                    set_current_screen={this.state.properties.set_current_screen}
                                 />
                                
                            </div>;

                        })}
                    
                    </div>
                    
                </div>
            );
    }
}

export default Stream_Displays;
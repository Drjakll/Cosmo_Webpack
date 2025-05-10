import React, {Component} from 'react';
import Main_Video from './Main_Video/main_video.js';
import Sub_Video from './Sub_Video/sub_video.js';
import { io } from 'socket.io-client';
import './streaming.less';

class Streaming extends Component {
    
    constructor(props){
        
        super(props);
        
        Streaming.contextType = window.Context;
        
        this.peerConfig = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' } // Public STUN server
            ]
        };
        
        this.state = {
            media_source: null,
            account_data: this.props.account_data,
            is_host: this.props.is_host
        };
    }
    
    componentDidMount(){
        this.Get_Media_Source();
        this.Setup_IO();
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    Get_Media_Source = () => {
        
        if(!window.navigator.mediaDevices || !window.navigator.mediaDevices.getUserMedia) {
            return;
        }
        
        window.navigator.mediaDevices.getUserMedia({video: true, audio: false}).then((mediaObj)=>{

            this.setState({media_source: mediaObj});
            
        }).catch((err)=>{
            
            console.log(err);
            
        });
        
    }
    
    Setup_IO = () => {
        
        this.socket = io('/video_streams');
        
        this.socket.on('connect', ()=>{
            
            if(this.socket.id){
                
                this.Create_Stream_Room(this.socket.id);
                
            }
            
        });
    }
    
    Create_Stream_Room = (socket_id) => {
        
        let {Stream_Room_Data_Templates} = this.context;
       
       
        let acc_copy = JSON.parse(JSON.stringify(this.state.account_data));
        
        let {Stream_Room_Data_Template} = Stream_Room_Data_Templates;
        
        acc_copy.id = socket_id;
        
        acc_copy.thumbnail_link = acc_copy.profile_picture_link;
        
        acc_copy.host_email = acc_copy.email;
        
        acc_copy.room_title = "New Room";
        
        acc_copy.is_host = this.state.is_host;
        
        let stream_room_data = Stream_Room_Data_Template(acc_copy);
        
        this.socket.emit('create_stream', JSON.stringify(stream_room_data));
        
    }
    
    render(){
        
        return (
                <div id="streaming">
                    
                    <div id="big-stream-screen">
                        
                        <Main_Video account_data={this.state.account_data} source={this.state.media_source} />
                        
                    </div>
                    
                    <div id="smaller-stream-screens">
                    
                        

                    </div>
                    
                </div>
            );
    }
}

export default Streaming;
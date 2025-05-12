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
            account_data: this.props.account_data,
            is_host: this.props.is_host,
            stream_id: this.props.stream_id,
            room_title: "New Room",
            the_host: null,
            visitors: {},
            streamers_small_screen: {}, //Streamers at the smaller screen
            streamer_big_screen: {}, //Stream for bigger screen
            self_screen: {} //Self stream
        };
    }
    
    componentDidMount() {

        this.Setup_IO();

    }
    
    componentWillUnmount() {
        
        this.socket.emit('leave_stream', JSON.stringify(this.my_room_tag));
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    Get_Self_Media_Source = () => {
        
        if(!window.navigator.mediaDevices || !window.navigator.mediaDevices.getUserMedia) {
            return;
        }
        
        window.navigator.mediaDevices.getUserMedia({video: true, audio: false}).then((mediaObj)=>{

            let { self_screen } = this.state;

            self_screen.media_source = mediaObj;
            
            this.setState({ self_screen: self_screen });
            
            this.Add_Self_Tracks_To_Peer(self_screen);
            
        }).catch((err)=>{
            
            console.log(err);
            
        });
        
    }
    
    Setup_IO = () => {
        
        this.socket = io('/video_streams');
        
        this.socket.on('connect', ()=>{
            
            if(this.socket.id){
                
                this.my_room_tag = this.Create_Room_Tag(this.socket.id);
                
                //Only the host would initially not have a stream id so it needs to create the room
                if (!this.state.stream_id) {
                    
                    this.Get_Self_Media_Source();
                    this.socket.emit('create_stream', JSON.stringify(this.my_room_tag));
                    
                } else {
                    
                    this.socket.emit('join_room', JSON.stringify(this.my_room_tag));
                    
                }
                
                let { self_screen } = this.state;
                
                this.setState({self_screen: this.Init_Peer_Connection(self_screen)});
                
            }
            
        });
        
        this.socket.on('new_viewer_joined', (data)=>{
            
            let new_viewer = JSON.parse(data);
            
            this.state.visitors[new_viewer.host_email] = new_viewer;
            
            this.socket.emit('to_new_viewer', JSON.stringify({to: new_viewer, 
                                                              from: this.my_room_tag,
                                                              local_description: this.state.self_screen.peer?.localDescription
                                                         }));

        });
        
        this.socket.on('to_new_viewer', (data)=>{
            
            let current_participant = JSON.parse(data);
            
            let {host_email} = current_participant;
            
            
            if(current_participant.is_host){
                
                this.setState({the_host: current_participant});
                
            } else {
                
                this.state.visitors[host_email] = current_participant;
                this.setState({visitors: this.state.visitors});
                
            }
            
        });
    }

    Create_Room_Tag = (stream_id) => {
        
        let {Stream_Room_Data_Templates} = this.context;
        

        let acc_copy = JSON.parse(JSON.stringify(this.state.account_data));

        let { Stream_Room_Data_Template } = Stream_Room_Data_Templates;

        acc_copy.id = stream_id;

        acc_copy.thumbnail_link = acc_copy.profile_picture_link;

        acc_copy.host_email = acc_copy.email;

        acc_copy.room_title = this.state.room_title;

        acc_copy.is_host = this.state.is_host;

        return Stream_Room_Data_Template(acc_copy);
    }
    
    Init_Peer_Connection = (streamer) => {
        
        let peer = new RTCPeerConnection(this.peerConfig);
        
        streamer.peer = peer;
        
        return streamer;

    }
    
    Add_Self_Tracks_To_Peer = (self_screen) => {
        
        let peer = self_screen.peer;
        let media_source = self_screen.media_source;
        
        if(media_source !== undefined){
            
            media_source.getTracks().forEach((track) => {
                
                peer?.addTrack(track, media_source);
                
            });
        }

        let sender = peer?.getSenders().find(s => s.track.kind === 'video');

        let parameters = sender?.getParameters();

        parameters?.encodings[0]?.maxBitrate = 500000;
        
        sender?.setParameters(parameters);
    }

    Offer_To_All = (peer) => {

        peer.createOffer().then(async (offer) => {

            await peer.setLocalDescription(offer);

        }).then(() => {

            this.socket.emit('offer_all', JSON.stringify({room_tag: this.my_room_tag, local_description: peer.localDescription}));
            
        }).catch(console.error);

    }
    
    
    
    render(){
        
        return (
                <div id="streaming">
                    
                    <div id="big-stream-screen">
                        
                        <Main_Video account_data={this.state.account_data} streamer={this.state.streamer_big_screen} />
                        
                    </div>
                    
                    <div id="smaller-stream-screens">
                    
                        

                    </div>
                    
                </div>
            );
    }
}

export default Streaming;
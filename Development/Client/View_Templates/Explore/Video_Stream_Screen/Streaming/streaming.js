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
            stream_id: this.props.stream_id, //The stream_id is the host email.
            room_title: "New Room",
            the_host: null,
            visitors: {},
            streamers_small_screen: {}, //Streamers at the smaller screen
            streamer_big_screen: {}, //Streamer at the bigger screen
            self_stream: {} //Self stream
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
    
    Get_Self_Media_Source = async () => {
        
        if(!window.navigator.mediaDevices || !window.navigator.mediaDevices.getUserMedia) {
            return;
        }
        
        let stream_src = await window.navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        
        return stream_src;
        
    }
    
    Setup_IO = () => {
        
        this.socket = io('/video_streams');
        
        this.socket.on('connect', async ()=>{
            
            if(this.socket.id){
                
                this.my_room_tag = this.Create_Room_Tag(this.socket.id);

                let { self_stream, is_host } = this.state;

                self_stream.peer = this.Init_Peer_Connection(this.my_room_tag);
                
                if (is_host) {

                    //If it's a host, then get their webcam permission
                    self_stream.media_source = await this.Get_Self_Media_Source();

                    this.socket.emit('create_stream', this.my_room_tag);
                    
                } else {
                    
                    this.socket.emit('join_stream', this.my_room_tag);
                    
                }

                this.setState({ self_stream: self_stream });

            }
            
        });
        
        this.socket.on('new_viewer_joined', (new_viewer_tag)=>{
            
            let {email} = new_viewer_tag;
            
            let {visitors} = this.state;
            
            visitors[email] = {};
            
            visitors[email].tag = new_viewer_tag;
            visitors[email].peer = this.Init_Peer_Connection(new_viewer_tag);
            
            this.Give_Self_Tracks_To_Peer(visitors[email]);
            
            this.setState({visitors: visitors});
            
            this.socket.emit('to_new_viewer', {
                to: new_viewer_tag, 
                from: this.my_room_tag
            });

        });

        this.socket.on('receive_local_description', (data) => {

            let { from, local_description } = JSON.parse(data);

            

        });
        
        this.socket.on('from_current_participant', (current_participant)=>{

            let {email, is_host} = current_participant;
            
            
            if(is_host){
                
                this.setState({the_host: current_participant});
                
            }
                
            this.state.visitors[email] = current_participant;
            this.setState({visitors: this.state.visitors});

        });
    }

    Create_Room_Tag = (my_id) => {
        
        let {Stream_Room_Data_Templates} = this.context;
        
        let {stream_id} = this.state;

        let acc_copy = JSON.parse(JSON.stringify(this.state.account_data));

        let { Stream_Room_Data_Template } = Stream_Room_Data_Templates;

        acc_copy.stream_id = stream_id;
        
        acc_copy.id = my_id;

        acc_copy.thumbnail_link = acc_copy.profile_picture_link;

        acc_copy.room_title = this.state.room_title;

        acc_copy.is_host = this.state.is_host;

        return Stream_Room_Data_Template(acc_copy);
    }
    
    Init_Peer_Connection = (tag) => {
        
        let peer = new RTCPeerConnection(this.peerConfig);
        
        peer.onicecandidate = (event) => {

            if (event.candidate) {
                this.socket.emit('send_ICE_to_remote', {
                    to: tag,
                    candidate: event.candidate
                });
            }
            
        };
        
        peer.ontrack = (event) => {
            
            let {visitors} = this.state;
            
            
            
        };
        
        return peer;

    }
    
    Give_Self_Tracks_To_Peer = (peer_stream) => {
        
        let {self_stream} = this.state;
        let {peer} = peer_stream;
        let {media_source} = self_stream;
        
        if(media_source !== undefined){
            
            media_source.getTracks().forEach((track) => {
                
                peer?.addTrack(track, media_source);
                
            });

            let sender = peer?.getSenders().find(s => s.track.kind === 'video');

            let parameters = sender?.getParameters();

            parameters?.encodings[0]?.maxBitrate = 500000;

            sender?.setParameters(parameters);
        }
        
    }

    Set_Receive_Tracks = (peer) => {

        peer.ontrack = (event) => {

            
            
        };

    }

    Offer_To_One = (peer) => {

        

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
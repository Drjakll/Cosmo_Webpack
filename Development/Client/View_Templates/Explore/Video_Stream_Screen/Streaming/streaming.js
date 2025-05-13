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
        
        return await window.navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        
    }
    
    Setup_IO = () => {
        
        this.socket = io('/video_streams');
        
        this.socket.on('connect', async ()=>{
            
            if(this.socket.id){
                
                this.my_room_tag = this.Create_Room_Tag(this.socket.id);

                let { self_stream } = this.state;

                self.peer = this.Init_Peer_Connection();
                
                //Only the host would initially not have a stream id so it needs to create the room
                if (!this.state.stream_id) {

                    //If it's a host, then get their webcam permission
                    self_stream.media_source = await this.Get_Self_Media_Source();

                    this.Add_Self_Tracks_To_Peer(self_stream);

                    this.socket.emit('create_stream', JSON.stringify(this.my_room_tag));
                    
                } else {
                    
                    this.socket.emit('join_room', JSON.stringify(this.my_room_tag));
                    
                }

                this.setState({ self_stream: self_stream });

            }
            
        });
        
        this.socket.on('new_viewer_joined', (data)=>{
            
            let new_viewer = JSON.parse(data);
            
            this.state.visitors[new_viewer.host_email] = new_viewer;
            
            this.socket.emit('to_new_viewer', JSON.stringify({
                to: new_viewer, 
                from: this.my_room_tag
            }));

            let { self_stream } = this.state;

            if (self_stream.peer?.localDescription !== undefined) {

                this.socket.emit('send_local_description', JSON.stringify({
                    to: new_viewer,
                    from: thios.my_room_tag,
                    local_description: self_stream.peer.localDescription
                }));

            }

        });

        this.socket.on('receive_local_description', (data) => {

            let { from, local_description } = JSON.parse(data);



        });
        
        this.socket.on('from_current_participant', (data)=>{
            
            let current_participant = JSON.parse(data);
            
            let {host_email} = current_participant;
            
            
            if(current_participant.is_host){
                
                this.setState({the_host: current_participant});
                
            }
                
            this.state.visitors[host_email] = current_participant;
            this.setState({visitors: this.state.visitors});

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
    
    Init_Peer_Connection = () => {
        
        return new RTCPeerConnection(this.peerConfig);

    }
    
    Add_Self_Tracks_To_Peer = (self_stream) => {
        
        let peer = self_stream.peer;
        let media_source = self_stream.media_source;
        
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

        peer.onicecandidate = (event) => {

            if (event.candidate) {
                peer.addIceCandidate(new RTCIceCandidate(event.candidate));
            }
        };

        peer.ontrack = (event) => {

            this.CreateVideoElement(from_socket_id, event.streams[0]);
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
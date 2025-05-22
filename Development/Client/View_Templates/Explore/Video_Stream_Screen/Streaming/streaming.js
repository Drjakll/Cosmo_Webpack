import React, {Component, createRef} from 'react';
import Main_Video from './Main_Video/main_video.js';
import Sub_Video from './Sub_Video/sub_video.js';
import Chat_Box from './Chat_Box/chat_box.js';
import Viewer_Display from './Viewer_Display/viewer_display.js';
import { io } from 'socket.io-client';
import './streaming.less';

class Streaming extends Component {

    small_screen_ref = createRef();
    
    constructor(props){
        
        super(props);
        
        Streaming.contextType = window.Context;
        
        this.peerConfig = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' } // Public STUN server
            ]
        };

        this.participants = {};
        this.the_host = null;
        this.my_media_source = null;

        this.Setup_IO();
        
        this.state = {
            account_data: this.props.account_data,
            is_host: this.props.is_host,
            stream_id: this.props.stream_id, //The stream_id is the host socket.id + Date.now()
            room_title: "New Room",
            streamer_small_screens: {}, //Streamers at the smaller screen
            streamer_big_screen: null, //Streamer at the bigger screen
            my_room_tag: null,
            socket: null
        };
    }
    
    componentDidMount() {

    }
    
    componentWillUnmount() {

        this.socket.emit('leave_stream', this.my_room_tag);
        this.Shut_Off_Camera();
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    Get_Self_Media_Source = async () => {
        
        if(!navigator.mediaDevices?.getUserMedia) {
            console.log("no device found!");
            return null;
        }
        
        return await navigator?.mediaDevices?.getUserMedia({ video: true, audio: false });
        
    }

    Generate_Stream_ID = (socket_id) => {
        return `${socket_id}${Date.now()}`;
    }
    
    Setup_IO = () => {
        
        this.socket = io('/video_streams');
        
        this.socket.on('connect', async ()=>{
            
            if(this.socket.id){
               

                let { is_host } = this.state;
                
                if (is_host) {

                    let stream_id = this.Generate_Stream_ID(this.socket.id);

                    this.my_room_tag = this.Create_Room_Tag(this.socket.id, stream_id);


                    //If it's a host, then get their webcam permission
                    this.my_media_source = await this.Capture_Video();

                    this.setState({
                        streamer_big_screen: this.my_media_source,
                        the_host: this.my_room_tag,
                        my_room_tag: this.my_room_tag,
                        socket: this.socket
                    });
                    

                    this.socket.emit('create_stream', this.my_room_tag);
                    
                } else {

                    this.my_room_tag = this.Create_Room_Tag(this.socket.id, this.state.stream_id);

                    this.setState({
                        my_room_tag: this.my_room_tag,
                        socket: this.socket
                    });
                    
                    //this.my_media_source = await this.Capture_Video();
                    
                    this.socket.emit('join_stream', this.my_room_tag);
                    
                }
                
            }
            
        });
        
        this.socket.on('new_viewer_joined', async (new_viewer_tag) => {

            let { id } = new_viewer_tag;
            

            this.participants[id] = {};
            this.participants[id].tag = new_viewer_tag;
            this.participants[id].peer = this.Init_Peer_Connection(new_viewer_tag);

            this.Give_Self_Tracks_To_Peer(this.participants[id]);

            
            this.New_Offer(this.participants[id]);

        });

        this.socket.on('receive_offer', async ({ from, remote_offer }) => {

            let { id } = from;

            this.participants[id] = {};
            this.participants[id].tag = from;
            
            let peer = this.Init_Peer_Connection(from);

            this.participants[id].peer = peer;

            
            await peer?.setRemoteDescription(new RTCSessionDescription(remote_offer));

            this.Give_Self_Tracks_To_Peer(this.participants[id]);


            let answer = await peer?.createAnswer();

            await peer?.setLocalDescription(answer);

            this.socket.emit('answer_to_offer', { from: this.my_room_tag, to: from, answer: answer });

        });

        this.socket.on('receive_answer', async ({ from, answer }) => {

            let { peer } = this.participants[from.id];

            await peer?.setRemoteDescription(new RTCSessionDescription(answer));
        });

        this.socket.on('receive_candidate', async ({ from, candidate }) => {

            let { peer } = this.participants[from.id];

            await peer?.addIceCandidate(new RTCIceCandidate(candidate));

        });

        this.socket.on('leave_room', ({ tag }) => {

            let { streamer_small_screens } = this.state;

            delete streamer_small_screens[tag.id];

            this.setState({ streamer_small_screens: streamer_small_screens });

        });

        this.socket.on('disband_room', ({ msg }) => {

            alert("The host has closed the stream");

            this.Shut_Off_Camera();

            this.props.set_main_screen("Stream_List_Components");

        });
    }

    Shut_Off_Camera = () => {


        if (this.my_media_source) {
            this.my_media_source.getTracks().forEach(track => track.stop());
        }

    }

    Create_Room_Tag = (my_id, stream_id) => {
        
        let {Stream_Room_Data_Templates} = this.context;

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
                this.socket.emit('send_candidate', {
                    to: tag,
                    from: this.my_room_tag,
                    candidate: event.candidate
                });
            }
            
        };
        
        peer.ontrack = (event) => {

            let { streamer_small_screens, streamer_big_screen } = this.state;
            
            streamer_small_screens[tag.id] = event.streams[0];

            if (tag.is_host) {
                streamer_big_screen = event.streams[0];
            }
            
            this.setState({
                streamer_small_screens: streamer_small_screens,
                streamer_big_screen: streamer_big_screen
            });
        };

        if (tag.is_host) {
            this.the_host = tag;
        }
        
        this.Go_Live_To_One(tag);
        
        return peer;

    }
    
    Give_Self_Tracks_To_Peer = (other_participant) => {

        let { peer } = other_participant;
        

        if (this.my_media_source) {

            this.my_media_source?.getTracks().forEach((track) => {

                peer?.addTrack(track, this.my_media_source);
                
            });

            //let sender = peer?.getSenders().find(s => s.track.kind === 'video');

            //let parameters = sender?.getParameters();

            //parameters?.encodings[0]?.maxBitrate = 5000000;

            //sender?.setParameters(parameters);
        }
        
    }

    New_Offer = async (participant) => {

        let { peer, tag } = participant;

        let offer = await peer.createOffer();

        await peer.setLocalDescription(offer);


        this.socket.emit('offer', {to: tag, from: this.my_room_tag, local_offer: offer});
            
    }
    
    Capture_Video = async () => {
        
        try {

            let media_source = await this.Get_Self_Media_Source();
     
            if (!this.my_room_tag.is_host) {

                let { streamer_small_screens } = this.state;

                streamer_small_screens[this.my_room_tag.id] = media_source;

                this.setState({ streamer_small_screens: streamer_small_screens });
            }

            return media_source;
            
        } catch(e){
            
            console.log("no device found");
            
            return null;
            
        }
    }

    Go_Live_To_All = async () => {

        for (let i in this.participants) {

            this.Give_Self_Tracks_To_Peer(this.participants[i]);

        }

    }
    
    Go_Live_To_One = (tag) => {
        
        this.Give_Self_Tracks_To_Peer(this.participants[tag.id]);
    }
    
    render(){

        const { Drag_Scroll } = this.context;

        let drag_scroll = new Drag_Scroll();

        return (
            <div id="streaming">
                    
                <div id="big-stream-screen">

                    
                        
                    <Main_Video account_data={this.state.account_data} media_source={this.state.streamer_big_screen} />
                        
                </div>

                <div id="smaller-stream-screens"
                    ref={this.small_screen_ref}
                    onMouseDown={(e) => { drag_scroll.init_drag(e, this.small_screen_ref.current); }}
                    onMouseLeave={(e) => { drag_scroll.disable_drag(e, this.small_screen_ref.current); }}
                    onMouseUp={(e) => { drag_scroll.disable_drag(e, this.small_screen_ref.current); }}
                    onMouseMove={(e) => { drag_scroll.move_drag(e, this.small_screen_ref.current); }}
                >
                    
                    {Object.keys(this.state.streamer_small_screens).map((key, index)=>{
                            
                        return key === this.the_host?.id ? "" : <div className="sub-video" key={index}>
                                
                            <Sub_Video media_source={this.state.streamer_small_screens[key]} />
                                
                        </div>;
                            
                    })}

                </div>

                <Chat_Box socket={this.socket} my_room_tag={this.state.my_room_tag} account_data={this.state.account_data} />
                    
            </div>
        );
    }
}

export default Streaming;
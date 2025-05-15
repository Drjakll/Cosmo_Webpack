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
            stream_id: this.props.stream_id, //The stream_id is the host socket.id
            room_title: "New Room",
            the_host: null,
            participants: {},
            streamer_small_screens: {}, //Streamers at the smaller screen
            streamer_big_screen: null, //Streamer at the bigger screen
            self_stream: {} //Self stream
        };
    }
    
    componentDidMount() {

        this.Setup_IO();

    }
    
    componentWillUnmount() {

        this.socket.emit('leave_stream', this.my_room_tag);
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
                
                console.log(`my id is ${this.socket.id}`);

                let { is_host, participants } = this.state;

                participants[this.socket.id] = {};
                
                if (is_host) {

                    this.my_room_tag = this.Create_Room_Tag(this.socket.id, this.socket.id);

                    //If it's a host, then get their webcam permission
                    let media_source = await this.Capture_Video();

                    this.setState({streamer_big_screen: media_source, the_host: this.my_room_tag});
                    

                    this.socket.emit('create_stream', this.my_room_tag);
                    
                } else {

                    this.my_room_tag = this.Create_Room_Tag(this.socket.id, this.state.stream_id);
                    
                    
                    this.Capture_Video();
                    
                    this.socket.emit('join_stream', this.my_room_tag);
                    
                }
                
                participants[this.socket.id].tag = this.my_room_tag;
                    
                participants[this.socket.id].peer = this.Init_Peer_Connection(this.my_room_tag);
                
                this.setState({ participants: participants });
                
            }
            
        });
        
        this.socket.on('new_viewer_joined', async (new_viewer_tag) => {

            console.log(`${new_viewer_tag.id} has joined the room!`);

            if (new_viewer_tag.is_host) {
                this.setState({ the_host: new_viewer_tag });
            }

            let { id } = new_viewer_tag;
            
            let { participants } = this.state;

            participants[id] = {};
            participants[id].tag = new_viewer_tag;
            participants[id].peer = this.Init_Peer_Connection(new_viewer_tag);
            
            

            this.New_Offer(participants[id]);

        });

        this.socket.on('receive_offer', async ({ from, remote_offer }) => {

            console.log(`received offer from ${from.id}`);

            let { participants } = this.state;
            let { id } = from;

            participants[id] = {};
            participants[id].tag = from;
            
            let peer = this.Init_Peer_Connection(from);

            participants[id].peer = peer;

            await this.setState({ participants: participants });
            
            await peer?.setRemoteDescription(new RTCSessionDescription(remote_offer));


            let answer = await peer?.createAnswer();

            await peer?.setLocalDescription(answer);
            
            console.log(`sent answer to ${from.id}`);

            this.socket.emit('answer_to_offer', { from: this.my_room_tag, to: from, answer: answer });

        });

        this.socket.on('receive_answer', async ({ from, answer }) => {
            
            console.log(`recieved answer from ${from.id}`);

            let { participants } = this.state;

            let { peer } = participants[from.id];

            await peer?.setRemoteDescription(new RTCSessionDescription(answer));
        });

        this.socket.on('receive_candidate', async ({ from, candidate }) => {

            let { participants } = this.state;
            let { peer } = participants[from.id];

            await peer?.addIceCandidate(new RTCIceCandidate(candidate));

        });
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
            
            console.log("receiving tracks...");
            
            this.setState({
                streamer_small_screens: streamer_small_screens,
                streamer_big_screen: streamer_big_screen
            });
        };
        
        this.Go_Live_To_One(tag);

        console.log(`peer connection created for ${tag.id}`);
        
        return peer;

    }
    
    Give_Self_Tracks_To_Peer = (other_participant) => {

        let { peer, tag } = other_participant;
        
        console.log(`giving tracks to ${tag.id}`);
        
        let media_source = this.state.participants[this.my_room_tag.id].media_source;

        if (media_source !== undefined) {

            media_source.getTracks().forEach((track) => {

                peer?.addTrack(track, media_source);
                
            });

            let sender = peer?.getSenders().find(s => s.track.kind === 'video');

            let parameters = sender?.getParameters();

            parameters?.encodings[0]?.maxBitrate = 500000;

            sender?.setParameters(parameters);
        }
        
    }

    New_Offer = async (participant) => {

        let { peer, tag } = participant;

        let offer = await peer.createOffer();

        await peer.setLocalDescription(offer);


        this.socket.emit('offer', {to: tag, from: this.my_room_tag, local_offer: offer});
            
        console.log(`offer created for ${tag.id}`);
    }
    
    Capture_Video = async () => {
        
        let { participants } = this.state;

        let self_participant = participants[this.my_room_tag.id];

        let media_source = await this.Get_Self_Media_Source();
        
        self_participant.media_source = media_source;
        
        this.setState({participants: participants});
        
        return media_source;
    }

    Go_Live_To_All = async () => {

        let {participants} = this.state;

        for (let i in participants) {

            this.Give_Self_Tracks_To_Peer(participants[i]);

        }

    }
    
    Go_Live_To_One = (tag) => {
        
        let {participants} = this.state;
        
        this.Give_Self_Tracks_To_Peer(participants[tag.id]);
    }
    
    render(){
        
        return (
                <div id="streaming">
                    
                    <div id="big-stream-screen">
                        
                        <Main_Video account_data={this.state.account_data} media_source={this.state.streamer_big_screen} />
                        
                    </div>
                    
                    <div id="smaller-stream-screens">
                    
                        {Object.keys(this.state.streamer_small_screens).map((key, index)=>{
                            
                            return key === this.state.the_host?.id ? "" : <div className="sub-video" key={index}>
                                
                                <Sub_Video media_source={this.state.streamer_small_screens[key]} />
                                
                            </div>;
                            
                        })}

                    </div>
                    
                </div>
            );
    }
}

export default Streaming;
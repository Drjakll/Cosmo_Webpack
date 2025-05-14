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
            participants: {},
            streamer_small_screens: {}, //Streamers at the smaller screen
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

                let { is_host, participants } = this.state;
                
                if (is_host) {

                    //If it's a host, then get their webcam permission
                    let participant = { media_source: await this.Get_Self_Media_Source() };

                    participants[this.my_room_tag.email] = participant;

                    this.setState({ participants: participants, the_host: this.my_room_tag });

                    this.socket.emit('create_stream', this.my_room_tag);
                    
                } else {
                    
                    this.socket.emit('join_stream', this.my_room_tag);
                    
                }
            }
            
        });
        
        this.socket.on('new_viewer_joined', (new_viewer_tag) => {

            let { email } = new_viewer_tag;

            let { participants } = this.state;

            participants[email] = {};

            participants[email].tag = new_viewer_tag;
            participants[email].peer = this.Init_Peer_Connection(new_viewer_tag);

            this.setState({ participants: participants });

            this.New_Offer(participants[email]);

        });

        this.socket.on('receive_offer', async ({ from, remote_description }) => {

            let { participants } = this.state;
            let { email } = from;

            if (from.is_host) {
                this.setState({ the_host: from });
            }

            let peer = this.Init_Peer_Connection(from);

            participants[email] = {};

            participants[email].tag = from;
            participants[email].peer = peer;


            await this.setState({ participants: participants });


            await peer?.setRemoteDescription(new RTCSessionDescription(remote_description));

            this.Give_Self_Tracks_To_Peer(participants[email]);

            let answer = await peer?.createAnswer();

            await peer?.setLocalDescription(answer);

            this.socket.emit('answer_to_offer', { from: this.my_room_tag, to: from, answer: answer });

        });

        this.socket.on('receive_answer', async ({ from, answer }) => {

            let { participants } = this.state;

            let { peer } = participants[from.email];

            await peer?.setRemoteDescription(new RTCSessionDescription(answer));
        });

        this.socket.on('receive_candidate', async ({ from, candidate }) => {

            let { participants } = this.state;
            let { peer } = participants[from.email];

            await peer?.addIceCandidate(new RTCIceCandidate(candidate));

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
                this.socket.emit('send_candidate', {
                    to: tag,
                    from: this.my_room_tag,
                    candidate: event.candidate
                });
            }
            
        };
        
        peer.ontrack = (event) => {

            let { streamer_small_screens, streamer_big_screen } = this.state;
            
            streamer_small_screens[tag.email] = event.streams[0];

            if (tag.is_host) {
                streamer_big_screen = event.stream[0];
            }

            this.setState({
                streamer_small_screens: streamer_small_screens,
                streamer_big_screen: streamer_big_screen
            });
        };
        
        return peer;

    }
    
    Give_Self_Tracks_To_Peer = (other_participant) => {

        let { peer } = other_participant;
        let { media_source } = this.state.participants[this.my_room_tag.email];

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

    New_Offer = (participant) => {

        let { peer, tag } = participant;

        peer.createOffer().then(async (offer) => {

            await peer.setLocalDescription(offer);

        }).then(() => {

            this.socket.emit('offer', {to: tag, from: this.my_room_tag, local_description: peer.localDescription});
            
        }).catch(console.error);

    }

    Go_Live = async () => {

        let { participants } = this.state;

        let self_participant = participants[this.my_room_tag.email];

        self_participant.media_source = await this.Get_Self_Media_Source();

        for (let i in participants) {

            this.Give_Self_Tracks_To_Peer(participants[i]);

        }

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
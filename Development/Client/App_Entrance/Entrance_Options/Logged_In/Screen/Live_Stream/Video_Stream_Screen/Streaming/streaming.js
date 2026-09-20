import React, {Component, createRef} from 'react';
import Main_Video from './Main_Video/main_video.js';
import Sub_Video from './Sub_Video/sub_video.js';
import Chat_Box from './Chat_Box/chat_box.js';
import init_websocket from '@init_websocket';
import Stream_Room_Data_Templates from '@stream_room_data';
import Profile_Popup from '@profile_popup';
import Drag_Scroll from '@drag_scroll';
import Popup_Msg from '@popup_message';
import './streaming.less';

class Streaming extends Component {

    small_screen_ref = createRef();

    streaming_status = {
        not_streaming: "Not Streaming",
        requested: "Requested",
        streaming: "Streaming"
    }
    
    constructor(props){
        
        super(props);
        
        let {owner_user_account, is_host, stream_id, turn_server_cred, stream_title} = props;

        this.peerConfig = {
            iceServers: [
                { 
                    urls: 'stun:stun.l.google.com:19302' // Public STUN server
                }, 
                {
                    urls: [
                        "turn:turn.cosmo-one.com:3478?transport=udp", 
                        "turn:turn.cosmo-one.com:3478?transport=tcp"
                    ],
                    username: turn_server_cred?.username,
                    credential: turn_server_cred?.credential
                }
            ]
        };

        this.participants = {};
        this.the_host = null;
        this.my_media_source = null;
        
        this.state = {
            owner_user_account,
            is_host,
            stream_id, //The stream_id is the host socket.id + Date.now()
            stream_title: stream_title ?? "New Room",
            streamer_small_screens: {}, //Streamers at the smaller screen
            streamer_big_screen: null, //Streamer at the bigger screen
            my_room_tag: null,
            view_account_data: null, //User account data for popup profile view
            the_host: null,
            big_screen_id: null,
            streaming_status: this.streaming_status.not_streaming
        };
    }

    async componentDidMount() {

        this.Setup_IO();

    }
    
    componentWillUnmount() {

        this.Shut_Off_Camera();
        this.socket?.emit('leave_stream', {room_tag: this.my_room_tag});
        this.socket?.disconnect();
        
        this.Report_Streaming_Status_To_Followers({room_tag: this.my_room_tag, is_streaming: false, is_hosting: this.state.is_host});
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }

        const {turn_server_cred} = this.props;
        const {username, credential} = turn_server_cred ?? {username: "", credential: ""};

        this.peerConfig.iceServers[1].username = username;
        this.peerConfig.iceServers[1].credential = credential;
        
        this.setState(this.props);
    }
    
    Get_Self_Media_Source = async () => {
        
        if(!navigator.mediaDevices?.getUserMedia) {
            console.log("no device found!");
            return null;
        }

        this.setState({streaming_status: this.streaming_status.streaming});
        
        return await navigator?.mediaDevices?.getUserMedia({ video: true, audio: true });
        
    }

    Generate_Stream_ID = (socket_id) => {
        return `stream:${socket_id}${Date.now()}`;
    }

    Report_Streaming_Status_To_Followers = async ({room_tag, is_hosting, is_streaming}) => {

        //Send the streaming status to the upper_bar.js through websocket because
        //upper_bar.js has the followers data while this component doesn't.
        window.global_user_socket?.emit("reporting_streaming_status",
            {
                room_tag,
                is_hosting,
                is_streaming
            }
        );

    }

    Init_Streaming = async ()=>{

        this.socket = init_websocket('/video_streams'); 

        this.socket?.on('connect', async ()=>{

            if(this.socket?.id){

                let { is_host, owner_user_account } = this.state;
                
                if (is_host) {

                    let stream_id = this.Generate_Stream_ID(this.socket.id);

                    this.my_room_tag = this.Create_Room_Tag(this.socket.id, stream_id);
                    

                    //If it's a host, then get their webcam permission
                    this.my_media_source = await this.Capture_Video();

                    this.setState({
                        streamer_big_screen: this.my_media_source,
                        the_host: this.my_room_tag,
                        my_room_tag: this.my_room_tag,
                        socket: this.socket,
                        stream_id
                    });

                    this.socket?.emit('create_stream', {my_room_tag: this.my_room_tag});

                    this.Report_Streaming_Status_To_Followers({room_tag: this.my_room_tag, is_hosting: true, is_streaming: true});
                    
                } else {

                    this.my_room_tag = this.Create_Room_Tag(this.socket?.id, this.state.stream_id);

                    this.setState({
                        my_room_tag: this.my_room_tag,
                        socket: this.socket
                    });
                    
                    this.socket?.emit('join_stream', {room_tag: this.my_room_tag, account_data: owner_user_account});

                    this.Report_Streaming_Status_To_Followers({room_tag: this.my_room_tag, is_hosting: false, is_streaming: true});
                    
                }
                
            }
        });
    }
    
    Setup_IO = () => {
        
        this.Init_Streaming();
        
        this.socket?.on('new_viewer_joined', async (new_viewer_tag) => {

            let {stream_id: self_stream_id} = this.my_room_tag;
            let { id, stream_id: from_stream_id } = new_viewer_tag;
            
            if(self_stream_id !== from_stream_id){
                return;
            }

            this.participants[id] = {};
            this.participants[id].tag = new_viewer_tag;
            this.participants[id].peer = this.Init_Peer_Connection(new_viewer_tag);

            this.Give_Self_Tracks_To_Peer(this.participants[id]);

            this.New_Offer(this.participants[id]);
        });

        this.socket?.on('video_stream_from_user', ({user_room_tag})=>{

            let {stream_id: self_stream_id} = this.my_room_tag;

            let {id, stream_id: from_stream_id} = user_room_tag;

            if(self_stream_id !== from_stream_id){
                return;
            }

            this.participants[id] = {};
            this.participants[id].tag = user_room_tag;
            this.participants[id].peer = this.Init_Peer_Connection(user_room_tag);

            this.Give_Self_Tracks_To_Peer(this.participants[id]);
            
            this.New_Offer(this.participants[id]);
        });

        this.socket?.on('receive_offer', async ({ from, remote_offer }) => {

            let {stream_id: self_stream_id} = this.my_room_tag;
            let { id, stream_id: from_stream_id } = from;

            if(self_stream_id !== from_stream_id){
                return;
            }

            this.participants[id] = {};
            this.participants[id].tag = from;
            this.participants[id].peer = this.Init_Peer_Connection(from);;

            let { peer } = this.participants[id];
            
            await peer?.setRemoteDescription(new RTCSessionDescription(remote_offer));

            this.Give_Self_Tracks_To_Peer(this.participants[id]);


            let answer = await peer?.createAnswer();

            await peer?.setLocalDescription(answer);

            this.socket?.emit('answer_to_offer', { from: this.my_room_tag, to: from, answer: answer });

        });

        this.socket?.on('stream_full', async({})=>{

            await Popup_Msg("message","Sorry, this stream is full. The maximum number of viewers has been reached.");

            this.props.set_main_screen("Stream_List_Components");
        });

        this.socket?.on('receive_answer', async ({ from, answer }) => {

            let {stream_id: self_stream_id} = this.my_room_tag;
            let {stream_id: from_stream_id} = from;

            if(self_stream_id !== from_stream_id){
                return;
            }

            let { peer } = this.participants[from.id];

            await peer?.setRemoteDescription(new RTCSessionDescription(answer));

        });

        this.socket?.on('receive_candidate', async ({ from, candidate }) => {

            let {stream_id: self_stream_id} = this.my_room_tag;
            let {stream_id: from_stream_id} = from;

            if(self_stream_id !== from_stream_id){
                return;
            }

            let { peer } = this.participants[from.id];

            await peer?.addIceCandidate(new RTCIceCandidate(candidate));

        });
        
        this.socket?.on('receive_answer_to_go_live', async ({answer})=>{
            
            if(answer){
                
                this.my_media_source = await this.Capture_Video();
                
                this.Go_Live_To_All();

                this.setState({
                    streaming_status: this.streaming_status.streaming
                });

            } else {

                this.setState({streaming_status: this.streaming_status.not_streaming})

            }

        });

        this.socket?.on('leave_room', ({ tag }) => {

            let { streamer_small_screens } = this.state;

            delete streamer_small_screens[tag.id];

            this.setState({ streamer_small_screens: streamer_small_screens });

        });

        this.socket?.on('disband_room', async ({ msg }) => {

            await Popup_Msg("message","The host has closed the stream");

            this.Shut_Off_Camera();

            this.props.set_main_screen("Stream_List_Components");

        });

        this.socket?.on('stop_streaming', ({from})=>{

            let {stream_id : from_stream_id} = from;

            let { streamer_small_screens, my_room_tag} = this.state;

            let {stream_id: self_stream_id} = this.my_room_tag;

            if(from_stream_id !== self_stream_id){
                return;
            }

            delete streamer_small_screens[from.id];

            this.setState({streamer_small_screens});

            if(from.id === my_room_tag.id){
                this.Shut_Off_Camera();
                this.setState({streaming_status: this.streaming_status.not_streaming})
            }
        });

        this.socket?.on('stream_not_exist', async ({})=>{

            await Popup_Msg('message', "Stream doesn't exist!");

        });
    }

    Shut_Off_Camera = () => {


        if (this.my_media_source) {

            this.my_media_source.getTracks().forEach(track => track.stop());

        }

    }

    Create_Room_Tag = (my_socket_id, stream_id) => {
        

        let acc_copy = JSON.parse(JSON.stringify(this.state.owner_user_account));

        let { Stream_Room_Data_Template } = Stream_Room_Data_Templates;

        acc_copy.stream_id = stream_id;
        
        acc_copy.id = my_socket_id;

        //acc_copy.thumbnail_link = acc_copy.profile_picture_link;

        acc_copy.stream_title = this.state.stream_title;

        acc_copy.is_host = this.state.is_host;

        return Stream_Room_Data_Template(acc_copy);
        
    }
    
    Init_Peer_Connection = (tag) => {
        
        let peer = this.participants[tag.id]?.peer;

        if (!peer) {
            peer = new RTCPeerConnection(this.peerConfig)
        } 
        
        peer.onicecandidate = (event) => {

            if (event.candidate) {
                this.socket?.emit('send_candidate', {
                    to: tag,
                    from: this.my_room_tag,
                    candidate: event.candidate
                });
            }
            
        };
        
        peer.ontrack = (event) => {

            let { streamer_small_screens, streamer_big_screen, big_screen_id } = this.state;
            
            streamer_small_screens[tag.id] = event.streams[0];

            if (tag.is_host) {
                streamer_big_screen = event.streams[0];
                big_screen_id = tag.id;
            }
            
            this.setState({
                streamer_small_screens: streamer_small_screens,
                streamer_big_screen: streamer_big_screen,
                big_screen_id: big_screen_id
            });
        };

        if (tag.is_host) {
            this.the_host = tag;
            this.setState({the_host: tag});
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


        this.socket?.emit('offer', {to: tag, from: this.my_room_tag, local_offer: offer});
            
    }
    
    Capture_Video = async () => {
        
        try {

            let media_source = await this.Get_Self_Media_Source();

            let { streamer_small_screens, big_screen_id } = this.state;

            if (this.my_room_tag.is_host) {
                big_screen_id = this.my_room_tag.id;
            }

            streamer_small_screens[this.my_room_tag.id] = media_source;

            this.setState({ streamer_small_screens: streamer_small_screens, big_screen_id: big_screen_id });

            return media_source;
            
        } catch(e){
            
            console.log("no device found");
            
            return null;
            
        }
    }

    Go_Live_To_All = async () => {

        this.socket?.emit('stream_to_all', { user_room_tag: this.my_room_tag});


        //for (let i in this.participants) {

        //    this.Give_Self_Tracks_To_Peer(this.participants[i]);

        //    //this.New_Offer(this.participants[i]);
        //}
        
    }
    
    Go_Live_To_One = (tag) => {
        
        this.Give_Self_Tracks_To_Peer(this.participants[tag.id]);

    }
    
    Set_Account_View = (account_data)=>{

        this.setState({view_account_data: account_data});
        
    }
    
    Generate_Profile_View = (account_data)=>{


        return account_data ? <Profile_Popup owner_user_account={account_data} visitor_user_account={this.state.owner_user_account} Exit={this.Close_Profile_Popup} /> : "";

    }

    Close_Profile_Popup = ()=>{
        
        this.setState({view_account_data: null});

    }

    Swap_With_Main_Screen = ({ id }) => {

        let { streamer_small_screens, streamer_big_screen, big_screen_id } = this.state;

        streamer_big_screen = streamer_small_screens[id];

        big_screen_id = id;

        this.setState({ streamer_small_screens, streamer_big_screen, big_screen_id });

    }
    
    render(){


        let drag_scroll = new Drag_Scroll();

        return (
            <div id="streaming">
    
                {this.Generate_Profile_View(this.state.view_account_data)}

                <div id="smaller-stream-screens"
                    ref={this.small_screen_ref}
                    onMouseDown={(e) => { drag_scroll.init_drag(e, this.small_screen_ref.current); }}
                    onMouseLeave={(e) => { drag_scroll.disable_drag(e, this.small_screen_ref.current); }}
                    onMouseUp={(e) => { drag_scroll.disable_drag(e, this.small_screen_ref.current); }}
                    onMouseMove={(e) => { drag_scroll.move_drag(e, this.small_screen_ref.current); }}
                >
                    
                    {Object.keys(this.state.streamer_small_screens).map((key, index) => {
                        
                        return key === this.state.big_screen_id ? "" : <div className="sub-video" key={key}>

                            <Sub_Video 
                                media_source={this.state.streamer_small_screens[key]}
                                id={key} 
                                swap_screen={this.Swap_With_Main_Screen}
                                is_self={this.state.my_room_tag?.id === key ? true : false} />
                                
                        </div>;
                            
                    })}

                </div>

                <div id="main-stream-side">

                    <div id="big-stream-screen">

                        <Main_Video 
                            owner_user_account={this.state.owner_user_account}
                            media_source={this.state.streamer_big_screen}
                            is_self={this.state.big_screen_id === this.state.my_room_tag?.id ? true : false} />
                            
                    </div>
                    
                    <div id="chatbox-wrapper">

                        <Chat_Box 
                            socket={this.socket} 
                            my_room_tag={this.state.my_room_tag} 
                            owner_user_account={this.state.owner_user_account}
                            set_account_view={this.Set_Account_View}
                            the_host={this.state.the_host}
                            change_screen={this.props.root_change_screen}
                            streaming_status={this.state.streaming_status}
                            co_streamers={this.state.streamer_small_screens}
                        />

                    </div>
                </div>  
            </div>
        );
    }
}

export default Streaming;
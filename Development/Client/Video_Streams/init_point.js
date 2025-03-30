import React, { Component, createRef } from 'react'
import { io } from 'socket.io-client';
import VideoObj from './VideoObj.js';

 class Init_Point extends Component {
     
    constructor(props){

        super(props);

        this.myvideoRef = createRef();
        
        this.peerConfig = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' } // Public STUN server
            ]
        };


        this.videoSrc = {};

        this.peerConnections = {};
        this.socket = null;


        this.state = {
           videoSrc: this.videoSrc
        };
    }
     
    async componentDidMount(){
         if(this.socket !== null){
             return;
         }
        //let ip = 'localhost';
        //let ip = '10.0.0.70';
        let ip = '192.168.7.108';
        this.socket = io(`/`);
        
        this.socket.on('connected', (data) => {
            
            console.log(this.socket.id);
            
            if(!this.socket.id){
                return;
            }

            this.socket.emit('register', {id: this.socket.id, user_info: {email: "dr_kimsora@yahoo.com", firstname: "Justin", lastname: "Zhu"}}); 
        });
 
        try {
            
            if(navigator.mediaDevices && window.navigator.mediaDevices.getUserMedia){
                this.localstream = await window.navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                
            }
        } catch(e){
            console.log(e);
        }
        

        
        if(this.localstream){
            this.myvideoRef.current.srcObject = this.localstream;
        }
               
        
        this.socket.on('broadcast_offers', (data)=>{
            
            let {clients_id} = typeof data === 'string' ? JSON.parse(data) : data;
            
            console.log(clients_id);
            
            for(let socket_id of clients_id){
 
                if(socket_id === this.socket.id){
                    continue;
                }
                
                console.log(`offering to ${socket_id}`);
                
                this.Offer(socket_id);
                
            }
            
        });
        
        this.socket.on('answer', (data)=>{
            
            let {from, offer} = typeof data === 'string' ? JSON.parse(data) : data;
            
            this.Received_Offer(from, offer);
        });
        
        this.socket.on('handle_response', (data)=>{
            
            let {answer, from} = typeof data === 'string' ? JSON.parse(data) : data;
            
            this.Handle_Response(from, answer);
            
        });
        
        this.socket.on('new_candidate', (data)=>{
            
            let {from, candidate} = typeof data === 'string' ? JSON.parse(data) : data;
            
            this.Add_Candidate(from, candidate);
        });
        
        this.socket.on('someone_dc', (data)=>{
            
            let {id} = typeof data === 'string' ? JSON.parse(data) : data;
            
            delete this.videoSrc[id];
            
            this.setState({videoSrc: this.videoSrc});
            
        });
    }
     
    Offer = (socket_id)=>{
         
        let peer = new RTCPeerConnection(this.peerConfig);

        this.peerConnections[socket_id] = peer;
        
        if(this.localstream){
            this.localstream.getTracks().forEach((track) => {     

               peer.addTrack(track, this.localstream);

            });
        }
        
        let sender = peer.getSenders().find(s => s.track.kind === 'video');

        let parameters = sender.getParameters();

        parameters.encodings[0].maxBitrate = 500000;

        sender?.setParameters(parameters);
        
        peer.ontrack = (event) => {
            
            this.CreateVideoElement(socket_id, event.streams[0]);
        };

        peer.createOffer().then(async (offer) => {
                
            await peer.setLocalDescription(offer);

        }).then(() => {
       
            this.socket.emit("offer", JSON.stringify({from: this.socket.id, to: socket_id, offer: peer.localDescription }));

        }).catch(console.error);
        
        peer.onicecandidate = (event) => {
            
            if (event.candidate) {
                 this.socket.emit('add_candidate', JSON.stringify({from: this.socket.id, to: socket_id, candidate: event.candidate }));
            }
        };

    }
    
    Received_Offer = async (from_socket_id, offer)=>{
        
        let peer = this.peerConnections[from_socket_id];
        
        if(!peer){
            
            peer = new RTCPeerConnection(this.peerConfig);
            
            this.peerConnections[from_socket_id] = peer;
            
            if(this.localstream){
                this.localstream.getTracks().forEach((track) => {     

                    peer.addTrack(track, this.localstream);

                });
            }
           
            let sender = peer.getSenders().find(s => s.track.kind === 'video');
           
            let parameters = sender.getParameters();
            
            parameters.encodings[0].maxBitrate = 500000;
            
            sender.setParameters(parameters);
            
            peer.onicecandidate = (event) => {
            
                if (event.candidate) {
                     this.socket.emit('add_candidate', JSON.stringify({ to: from_socket_id, candidate: event.candidate }));
                }
            };
            
            peer.ontrack = (event) => {
            
                this.CreateVideoElement(from_socket_id, event.streams[0]);
            };
        }

        peer.setRemoteDescription(new RTCSessionDescription(offer)).then(()=>{

            return peer.createAnswer();
        }).then(async (answer)=>{
 
            await peer.setLocalDescription(answer);
        }).then(()=>{

            this.socket.emit('response', JSON.stringify({to_id: from_socket_id, from: this.socket.id, answer: peer.localDescription }));

        });
        
    }
    
    Handle_Response = async (from, answer)=>{
        
        let peer = this.peerConnections[from];
        
        await peer.setRemoteDescription(new RTCSessionDescription(answer));
        
    }
    
    Add_Candidate = async (from, candidate)=>{
        
        let peer = this.peerConnections[from];
        
        console.log(`Added a new candidate ${from}`);
        peer.addIceCandidate(new RTCIceCandidate(candidate));
    }
     
    CreateVideoElement = (index, videoSrc)=>{


       this.videoSrc[index] = {src: videoSrc};

       this.setState({videoSrc: this.videoSrc});

    }
     
    render(){

       return <div>

           <video height="360" width="640" ref={this.myvideoRef} autoPlay muted>
               <source />
           </video>

           {Object.keys(this.state.videoSrc).map((v, k)=>{

               return <VideoObj src={this.state.videoSrc[v].src} key={k}/>;

           })}

       </div>;
    }
}

export default Init_Point

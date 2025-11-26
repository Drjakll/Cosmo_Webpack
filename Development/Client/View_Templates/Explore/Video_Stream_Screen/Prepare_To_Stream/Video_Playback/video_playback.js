import React, {Component, createRef} from 'react';
import './video_playback.less';


class Video_Playback extends Component {
    
    videoRef = createRef();
    
    constructor(props){
        
        super(props);
        
        this.state = {
            owner_user_account: this.props.owner_user_account
        };

    }
    
    componentDidMount(){
        
        this.Get_Media_Object();
    }
    
    componentWillUnmount(){
        
        this.videoRef.current.srcObject?.getTracks().forEach((track)=>{
            track.stop();
        });
        
    }
    
    Get_Media_Object = async ()=>{
        
        if(!window.navigator.mediaDevices || !window.navigator.mediaDevices.getUserMedia) {
            return;
        }
        
        window.navigator.mediaDevices.getUserMedia({video: true, audio: false}).then((mediaObj)=>{
            
            this.videoRef.current.srcObject = mediaObj;
            this.videoRef.current.play = true;
            
        }).catch((err)=>{
            
            console.log(err);
            
        });

    }
    
    render(){
        
        return (
                <div id="video-playback">
                    
                    <video ref={this.videoRef} id="the-video-object" autoPlay playsInline/>
                    
                </div>
            );
    }
}

export default Video_Playback;
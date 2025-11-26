import React, {Component, createRef} from 'react';
import './main_video.less';

class Main_Video extends Component {
    
    videoRef = createRef();
    
    constructor(props){
        
        super(props);
        
        this.state = {
        };
    }
    
    componentDidMount(){
        
        this.videoRef.current.srcObject = this.props.media_source;
        this.videoRef.current.play = true;
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(prevProps === this.props){
            return;
        }
        
        this.videoRef.current.srcObject = this.props.media_source;
        this.videoRef.current.play = true;
        this.videoRef.current.muted = this.props.is_self ? true : false;
    }
    
    render(){
        
        return (
                <div id="main-video">
                    
                    <video id="video-display" ref={this.videoRef} autoPlay/>
                    
                </div>
            );
    }
}

export default Main_Video;
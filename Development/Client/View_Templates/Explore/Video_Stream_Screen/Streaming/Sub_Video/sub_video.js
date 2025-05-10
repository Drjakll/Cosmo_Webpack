import React, {Component, createRef} from 'react';
import './sub_video.less';

class Sub_Video extends Component {
    
    videoRef = createRef();
    
    constructor(props){
        
        super(props);
        
        this.state = {
            account_data: this.props.account_data
        };
        
        this.videoRef.current.srcObject = this.props.source;
        this.videoRef.current.play = true;
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState({account_data: this.props.account_data});
        
        this.videoRef.current.srcObject = this.props.source;
        this.videoRef.current.play = true;
    }
    
    render(){
        
        return (
                <div id="sub-video">
                    
                    <video id="video-display" ref={this.videoRef} autoPlay/>                    
                    
                </div>
            );
    }
}

export default Sub_Video;
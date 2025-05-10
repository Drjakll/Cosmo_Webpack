import React, {Component, createRef} from 'react';
import './main_video.less';

class Main_Video extends Component {
    
    videoRef = createRef();
    
    constructor(props){
        
        super(props);
        
        this.state = {
            account_data: this.props.account_data
        };
    }
    
    componentDidMount(){
        
        this.videoRef.current.srcObject = this.props.source;
        this.videoRef.current.play = true;
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(prevProps === this.props){
            return;
        }
        
        this.setState({account_data: this.props.account_data});
        
        this.videoRef.current.srcObject = this.props.source;
        this.videoRef.current.play = true;
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
import React, {Component, createRef} from 'react';
import './sub_video.less';

class Sub_Video extends Component {
    
    videoRef = createRef();
    
    constructor(props){
        
        super(props);
        
        this.state = {
        };
       
    }
    
    componentDidMount(){
        
        this.videoRef.current.srcObject = this.props.media_source;
        this.videoRef.current.play = true;
        this.videoRef.current.muted = this.props.is_self ? true : false;
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.videoRef.current.srcObject = this.props.media_source;
        this.videoRef.current.play = true;
        this.videoRef.current.muted = this.props.is_self ? true : false;
    }

    Swap_Screen = () => {

        let { swap_screen, id } = this.props;

        swap_screen({ id });

    }
    
    render(){
        
        return (
            <div id="sub-video" onDoubleClick={this.Swap_Screen}>

                <video id="video-display" ref={this.videoRef} autoPlay />

            </div>
        );
    }
}

export default Sub_Video;
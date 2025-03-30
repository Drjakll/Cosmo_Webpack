import React, {Component, createRef} from 'react';

class VideoObj extends Component {
    
    constructor(props){
        super(props);
        
        this.ref = createRef();
        
        this.state = {
            src : this.props.src
        };
    }
    
    componentDidMount(){
        
        this.ref.current.srcObject = this.props.src;
        this.ref.current.play = true;
        
    }
    
    render(){
        
        return <div>
        
            <video height="360" width="640" muted ref={this.ref} autoPlay playsInline controls/>
        
        </div>
    }
}

export default VideoObj;
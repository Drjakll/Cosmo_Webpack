import React, {Component} from 'react';
import './init_streaming_buttons.less';

class Init_Streaming_Buttons extends Component {
    
    constructor(props){
        
        super(props);

    }
    
    Go_Live = (e)=>{
        
        this.props.start_streaming();
    }
    
    render(){
        
        return (
                <div id="init-streaming-buttons">
                    
                    <div id="start-button" onClick={this.Go_Live}>
                        
                        Go Live
                        
                    </div>
                    
                </div>
            );
    }
}

export default Init_Streaming_Buttons;
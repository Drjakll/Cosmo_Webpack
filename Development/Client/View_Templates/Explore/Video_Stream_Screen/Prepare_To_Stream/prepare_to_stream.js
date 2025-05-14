import React, {Component} from 'react';
import Video_Playback from './Video_Playback/video_playback.js';
import Init_Streaming_Buttons from './Init_Streaming_Buttons/init_streaming_buttons.js';
import './prepare_to_stream.less';


class Prepare_To_Stream extends Component {
    
    constructor(props){
        
        super(props);
        
        this.state = {
            account_data: this.props.account_data
        };
    }
    
    Start_Streaming = ()=>{
        
        let {account_data} = this.state;
        let {email} = account_data;
        
        this.props.change_screen("Streaming", true, email);
    }
    
    render(){
        
        return (
                <div id="prepare-to-stream">
                    
                    <div id="video-playback-wrapper">
                    
                        <Video_Playback account_data={this.state.account_data} />

                    </div>
                    
                    <div id="init-stream-buttons-wrapper">
                
                        <Init_Streaming_Buttons account_data={this.state.account_data} start_streaming={this.Start_Streaming}/>
                        
                    </div>
                    
                </div>
            );
    }
}

export default Prepare_To_Stream;
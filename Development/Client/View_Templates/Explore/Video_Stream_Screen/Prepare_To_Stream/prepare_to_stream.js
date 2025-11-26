import React, {Component} from 'react';
import Video_Playback from './Video_Playback/video_playback.js';
import Init_Streaming_Buttons from './Init_Streaming_Buttons/init_streaming_buttons.js';
import './prepare_to_stream.less';


class Prepare_To_Stream extends Component {
    
    constructor(props){
        
        super(props);
        
        this.state = {
            owner_user_account: this.props.owner_user_account
        };
    }
    
    Start_Streaming = ()=>{
        
        this.props.change_screen("Streaming", true);
    }
    
    render(){
        
        return (
                <div id="prepare-to-stream">
                    
                    <div id="video-playback-wrapper">
                    
                        <Video_Playback owner_user_account={this.state.owner_user_account} />

                    </div>
                    
                    <div id="init-stream-buttons-wrapper">
                
                        <Init_Streaming_Buttons owner_user_account={this.state.owner_user_account} start_streaming={this.Start_Streaming}/>
                        
                    </div>
                    
                </div>
            );
    }
}

export default Prepare_To_Stream;
import React, {Component} from 'react';
import Video_Playback from './Video_Playback/video_playback.js';
import Init_Streaming_Buttons from './Init_Streaming_Buttons/init_streaming_buttons.js';
import './prepare_to_stream.less';


class Prepare_To_Stream extends Component {
    
    constructor(props){
        
        super(props);
        
        this.state = {
            owner_user_account: this.props.owner_user_account,
        };
    }
    
    Start_Streaming = ()=>{
        
        this.props.change_screen("Streaming", true);
    }

    Go_Back = (e) => {
        
        this.props.root_change_screen("Stream_List_Components", false, null);
    }
    
    render(){
        
        return (
                <div id="prepare-to-stream">

                    <div id="go-back-button" onClick={this.Go_Back}>
                        Go Back
                    </div>
                    
                    <div id="video-playback-wrapper">
                    
                        <Video_Playback owner_user_account={this.state.owner_user_account} />

                    </div>

                    <div id="stream-title-input-wrapper">

                        <input type="text" placeholder="Stream Title" 
                                id="stream-title-input" 
                                onBlur={(e)=>{
                                    this.props.update_stream_title(e.target.value);
                                }}/>

                    </div>
                    
                    <div id="init-stream-buttons-wrapper">
                
                        <Init_Streaming_Buttons owner_user_account={this.state.owner_user_account} start_streaming={this.Start_Streaming}/>
                        
                    </div>
                    
                </div>
            );
    }
}

export default Prepare_To_Stream;
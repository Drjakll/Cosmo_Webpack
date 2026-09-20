import React, {Component} from 'react';
import Video_Playback from './Video_Playback/video_playback.js';
import Init_Streaming_Buttons from './Init_Streaming_Buttons/init_streaming_buttons.js';
import Popup_Msg from '@popup_message';
import './prepare_to_stream.less';


class Prepare_To_Stream extends Component {
    
    constructor(props){
        
        super(props);
        
        this.state = {
            owner_user_account: this.props.owner_user_account,
            title_char_length: 0
        };
    }
    
    Start_Streaming = async ()=>{

        let {title_char_length} = this.state;

        if(!title_char_length) {
            await Popup_Msg("message", "A title is required");
            return;
        }
        
        this.props.change_screen("Streaming", true);
    }

    Go_Back = (e) => {
        
        this.props.root_change_screen("Stream_List_Components", false, null);
        
    }
    
    render(){

        let {title_char_length} = this.state;
        
        return (
                <div id="prepare-to-stream">

                    <div id="go-back-button" onClick={this.Go_Back}>
                        Go Back
                    </div>
                    
                    <div id="video-playback-wrapper">
                    
                        <Video_Playback owner_user_account={this.state.owner_user_account} />

                    </div>

                    <div id="stream-title-input-wrapper">

                        <input type="text" 
                                placeholder="Stream Title" 
                                id="stream-title-input" 
                                maxLength={26}
                                onChange={(e)=>{
                                    this.setState({title_char_length: e.target.value.length});
                                }}
                                onBlur={(e)=>{
                                    this.props.update_stream_title(e.target.value);
                                }}/>

                        {`${title_char_length}/26 characters`}

                    </div>
                    
                    <div id="init-stream-buttons-wrapper">
                
                        <Init_Streaming_Buttons owner_user_account={this.state.owner_user_account} start_streaming={this.Start_Streaming}/>
                        
                    </div>
                    
                </div>
            );
    }
}

export default Prepare_To_Stream;
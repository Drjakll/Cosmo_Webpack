import React, {Component} from 'react';
import Individual_Stream_Thumbnail from './Individual_Stream_Thumbnail/individual_stream_thumbnail.js';
import Init_Stream from './Init_Stream/init_stream.js';
import './stream_displays.less';

class Stream_Displays extends Component {

    
    constructor(props){
        
        super(props);
        
        this.state = {
            active_streams: {},
            properties: this.props.properties
        };

    }
    
    componentDidMount() {
        
        
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(prevProps === this.props){
            return;
        }
        
        this.setState(this.props);
        
        
    }

    
    render(){

        let { active_streams } = this.state;

        let active_streams_keys = Object.keys(active_streams);
        
        return (
                <div id="stream-displays">
                    
                    <div id="thumbnails-wrapper">
                    
                        {active_streams_keys.length === 0 ? 
                        
                        <div id="no-streams-message">No active streams</div> 
                        
                        : 

                        active_streams_keys?.map((key, index)=>{

                            let stream_info = active_streams[key];

                            return <div className="thumbnail-wrapper" key={index}>

                                <Individual_Stream_Thumbnail 
                                    image_link={stream_info?.profile_picture_link} 
                                    title={stream_info?.room_title}
                                    stream_id={stream_info?.stream_id}
                                    set_current_screen={this.state.properties.set_current_screen}
                                 />
                                
                            </div>;

                        })}
                    
                    </div>

                    <div id="init-stream">

                        <Init_Stream properties={{set_current_screen: this.props.properties.set_current_screen}} />

                    </div>
                    
                </div>
            );
    }
}

export default Stream_Displays;
import React, {Component} from 'react';
import Individual_Stream_Thumbnail from './Individual_Stream_Thumbnail/individual_stream_thumbnail.js';
import Init_Stream from './Init_Stream/init_stream.js';
import './stream_displays.less';

class Stream_Displays extends Component {
    
    constructor(props){
        
        super(props);

        let {properties, active_streams} = props;

        let active_stream_keys = Object.keys(active_streams);
        
        this.state = {
            active_streams,
            active_stream_keys,
            properties,
        };

    }
    
    componentDidMount() {
        
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(prevProps === this.props){
            return;
        }

        let {properties, active_streams} = this.props;

        let active_stream_keys = Object.keys(active_streams);
        
        this.setState({properties, active_streams, active_stream_keys});
    }

    Trigger_Search_Streams = () => {

        let {properties} = this.props;
        let {trigger_search_streams} = properties;

        trigger_search_streams();
    }
    
    render(){

        let { active_streams, active_stream_keys } = this.state;

        return (
                <div id="stream-displays">

                    <div id="refresh-button-wrapper">

                        <div id="refresh-button" 
                            style={{backgroundImage: `url(./static/refresh_icon.webp)`}}
                            onClick={this.Trigger_Search_Streams}
                        ></div>

                    </div>
                    
                    <div id="thumbnails-wrapper">
                    
                        {!active_stream_keys.length ? 
                        
                            <div id="no-streams-message">No active streams</div> 
                        
                        : 

                            active_stream_keys?.map((key, index)=>{

                                let stream_info = active_streams[key];

                                return <div className="thumbnail-wrapper" key={index}>

                                    <Individual_Stream_Thumbnail 
                                        image_link={stream_info?.profile_picture_link} 
                                        title={stream_info?.stream_title}
                                        stream_id={stream_info?.stream_id}
                                        set_current_screen={this.state.properties.set_current_screen}
                                    />
                                    
                                </div>;

                            })
                        }
                    
                    </div>

                    <div id="init-stream">

                        <Init_Stream properties={{set_current_screen: this.props.properties.set_current_screen}} />

                    </div>
                    
                </div>
            );
    }
}

export default Stream_Displays;
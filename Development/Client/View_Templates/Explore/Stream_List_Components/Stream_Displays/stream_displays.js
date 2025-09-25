import React, {Component} from 'react';
import Individual_Stream_Thumbnail from './Individual_Stream_Thumbnail/individual_stream_thumbnail.js';
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
        
        return (
                <div id="stream-displays">
                    
                    <div id="thumbnails-wrapper">
                    
                        {Object.keys(this.state.active_streams)?.map((key, index)=>{

                            let stream_info = this.state.active_streams[key];

                            return <div className="thumbnail-wrapper" key={index}>

                                <Individual_Stream_Thumbnail 
                                    image_link={stream_info?.thumbnail_link} 
                                    title={stream_info?.room_title}
                                    stream_id={stream_info?.stream_id}
                                    set_current_screen={this.state.properties.set_current_screen}
                                 />
                                
                            </div>;

                        })}
                    
                    </div>
                    
                </div>
            );
    }
}

export default Stream_Displays;
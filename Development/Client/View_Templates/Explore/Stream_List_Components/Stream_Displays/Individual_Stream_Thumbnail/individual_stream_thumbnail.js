import React, {Component} from 'react';
import './individual_stream_thumbnail.less';

class Individual_Stream_Thumbnail extends Component {
    
    constructor(props){
        
        super(props);
        
        Individual_Stream_Thumbnail.contextType = window.Context;
        
        this.state = {
            image_link: this.props.image_link,
            title: this.props.title,
            stream_id: this.props.stream_id
        };
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    render(){
        
        const {Request_URLs} = this.context;
        
        const {aws_s3_url} = Request_URLs;
        
        return <div id="stream-thumbnail">
            
            <div id="img" 
                style={{backgroundImage: `url('${aws_s3_url}${this.state.image_link}')`}}
                onClick = {(e)=>{
                    this.props.set_current_screen("Video_Stream_Screen", false, this.state.stream_id);
                }}
            >
            </div>
            
            <div id="room-title">
            
                {this.state.title}
                
            </div>
            
        </div>;
    }
}

export default Individual_Stream_Thumbnail;
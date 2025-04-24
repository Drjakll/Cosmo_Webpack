import React, {Component} from 'react';
import './album_cover.less';

class Album_Cover extends Component {
    
    constructor(props){
        
        super(props);
        
        Album_Cover.contextType = window.Context;
        
        this.state = {
            album_info: props.album_info,
            photos: []
        };
    }
    
    componentDidMount(){

    }
    
    async componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        let properties = this.props;
        
        for(let i in properties){
            
            this.state[i] = properties[i];
            
        }
        
        this.setState(this.state);
        
    }
    
    render(){
        
        const {Request_URLs} = this.context;
        const cover_image_link = this.state.album_info?.cover_image_link;
        
        let {aws_s3_url} = Request_URLs;
        
        //Make sure that it doesn't unneccessary make request to aws s3 if cover_image_link isn't available
        aws_s3_url = cover_image_link ? aws_s3_url : "";
        
        return (
                <div id="album-cover">
                    
                    <div id="album-cover-wrapper">
                    
                        <div id="album-cover-image" 
                            style={{
                                backgroundImage: `url('${aws_s3_url}${cover_image_link}')`
                            }}
                            onClick = {(e)=>{
                                this.props.Get_Photo_Links(this.state.album_info);
                            }}
                        >
                        
                            
                        
                        </div>
                        
                    </div>
                    
                    <div id="album-title-wrapper">   
                    
                        {this.state.album_info?.title}
                    
                    </div>
                    
                </div>
            );
    }
}

export default Album_Cover;
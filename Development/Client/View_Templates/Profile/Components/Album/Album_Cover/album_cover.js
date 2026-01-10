import React, {Component} from 'react';
import Context from '@context/context.js';
import './album_cover.less';

class Album_Cover extends Component {
    
    constructor(props){
        
        super(props);
        
        Album_Cover.contextType = Context;

        let {album_info} = props;
        
        this.state = {
            album_info,
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
        
        let { aws_s3_url } = this.context.Request_URLs;

        let {album_info} = this.state;

        let { album_cover_link } = album_info ?? {};

        
        //Make sure that it doesn't unneccessary make request to aws s3 if cover_image_link isn't available
        aws_s3_url = album_cover_link ? aws_s3_url : "";
        
        return (
                <div id="album-cover">
                    
                    <div id="album-cover-wrapper">
                    
                        <div id="album-cover-image" 
                            style={{
                                backgroundImage: `url('${aws_s3_url}${album_cover_link}')`
                            }}

                            onClick = {async (e)=>{
                                await this.props.Get_Photo_Links(album_info);
                                this.props.change_display();
                            }}
                        >
                            {
                                album_info?.brief_description ?

                                <div id="album-description">
                                    {album_info?.brief_description}
                                </div>

                                : ""
                            }
                        </div>
                        
                    </div>
                    
                    <div id="album-title-wrapper" >   
                    
                        ({album_info?.photo_count}) {album_info?.title} 
                    
                    </div>
                    
                </div>
            );
    }
}

export default Album_Cover;
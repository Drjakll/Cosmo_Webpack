import React, {Component} from 'react';
import Request_URLs from '@request_urls';
import './album_cover.less';

class Album_Cover extends Component {
    
    constructor(props){
        
        super(props);

        let {album_info, visitor_all_following_status} = props;
        
        this.state = {
            album_info,
            visitor_all_following_status
        };
    }
    
    componentDidMount(){

    }
    
    async componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
        
    }
    
    render(){
        
        let { aws_s3_url } = Request_URLs;

        let {album_info} = this.state;

        let { album_cover_link } = album_info ?? {};

        album_cover_link = album_cover_link?.replace(/\?/g, "%3F")
        
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
                    
                    <pre id="album-title-wrapper" >   
                    
                        <b>{album_info?.title}</b> [{album_info?.photo_count}]
                    
                    </pre>
                    
                </div>
            );
    }
}

export default Album_Cover;
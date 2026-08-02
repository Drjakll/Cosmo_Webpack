import React, {Component} from 'react';
import Enlarged_Single_Photo from './Enlarged_Single_Photo/enlarged_single_photo.js';
import Request_URLs from '@request_urls';
import './single_photo_thumbnail.less';

class Single_Photo extends Component {

    Enlarged_Single_Photo = Enlarged_Single_Photo
    
    constructor(props){
        
        super(props);
    

        let { owner_user_account, visitor_user_account, photo_info, album_info} = this.props;
        
        this.state = {
            photo_info,
            enlarge_photo: false,
            owner_user_account,
            visitor_user_account,
            photos_to_be_deleted: {},
            album_info
        };
    }

    componentDidMount(){

        

    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }

    Show_Enlarged_Photo = () => {

        
        let {aws_s3_url} = Request_URLs;

        const photo_link = this.state.photo_info?.link;

        //To avoid unecessary request to the aws s3 if there is no photo link available
        aws_s3_url = photo_link ? aws_s3_url : "";

        let {Enlarged_Single_Photo: Enlarged_Photo, Signal_All_Refresh_Reactions} = this;

        let {photo_info, owner_user_account, visitor_user_account, album_info} = this.state;
        
        return  <Enlarged_Photo 
            photo_info={photo_info}
            aws_s3_url={`${aws_s3_url}`}
            owner_user_account={owner_user_account}
            visitor_user_account={visitor_user_account}
            album_info={album_info}
            Get_Albums={this.props.Get_Albums} 
        />;
    }
    
    render(){
        
        let {aws_s3_url} = Request_URLs;

        let {photo_info} = this.state;
        
        let {link: thumbnail_pic_link, comments_count} = photo_info;

        let {change_main_display, open_enlarged_photo_viewer, index} = this.props;

        thumbnail_pic_link = thumbnail_pic_link.replace(/\?/g, "%3F")
        
        //To avoid unecessary request to the aws s3 if there is no photo link available
        aws_s3_url = thumbnail_pic_link ? aws_s3_url : "";
        
        return (
            <div id="single-photo-thumbnail">

                <div id="enlarge-photo-button-wrapper">

                    <div id="enlarge-photo-button" onClick={(e)=>{
                        open_enlarged_photo_viewer(index);
                    }}>
                        <label>Enlarge Image</label>
                    </div>

                    <div id="enlarge-photo-with-comments-button" onClick={(e)=>{
                        change_main_display(this.Show_Enlarged_Photo);
                    }}>
                        <label>View Comments</label>
                    </div>

                </div>

                <div id="photo-thumbnail"
                    style={{
                        backgroundImage: `url('${aws_s3_url}${thumbnail_pic_link}')`
                    }}
                >
                    
                </div>

                <div id="comment-count-wrapper" onClick={(e)=>{ 

                    change_main_display(this.Show_Enlarged_Photo);

                }}>

                    {comments_count} {comments_count > 1 ? "Comments" : "Comment"}

                </div>
                    
            </div>
        );
    }
}

export default Single_Photo;
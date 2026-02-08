import React, {Component} from 'react';
import Enlarged_Single_Photo from './Enlarged_Single_Photo/enlarged_single_photo.js';
import './single_photo_thumbnail.less';

class Single_Photo extends Component {

    Enlarged_Single_Photo = Enlarged_Single_Photo
    
    constructor(props){
        
        super(props);
        
        Single_Photo.contextType = window.Context;

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

        const {Request_URLs} = this.context;
        
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
        
        const {Request_URLs} = this.context;
        
        let {aws_s3_url} = Request_URLs;

        let {photo_info} = this.state;
        
        const {link: thumbnail_pic_link, comments_count} = photo_info;
        
        //To avoid unecessary request to the aws s3 if there is no photo link available
        aws_s3_url = thumbnail_pic_link ? aws_s3_url : "";
        
        return (
            <div id="single-photo-thumbnail">

                <div id="photo-thumbnail"
                    style={{
                        backgroundImage: `url('${aws_s3_url}${thumbnail_pic_link}')`
                    }}
                    onClick = {(e)=>{
                            
                        this.props.change_main_display(this.Show_Enlarged_Photo);
                    }}
                >
                    
                </div>

                <div id="comment-count-wrapper">

                    {comments_count} {comments_count > 1 ? "Comments" : "Comment"}

                </div>
                    
            </div>
        );
    }
}

export default {Single_Photo, Enlarged_Single_Photo};
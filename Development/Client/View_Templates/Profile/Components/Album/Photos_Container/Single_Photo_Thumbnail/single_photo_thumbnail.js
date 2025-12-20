import React, {Component} from 'react';
import Enlarged_Single_Photo from './Enlarged_Single_Photo/enlarged_single_photo.js';
import './single_photo_thumbnail.less';

class Single_Photo extends Component {
    
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
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    Exit_Enlarge_Mode = () => {
        
        this.setState({enlarge_photo: false});
    }

    Show_Enlarged_Photo = () => {

        const {Request_URLs} = this.context;
        
        let {aws_s3_url} = Request_URLs;

        const photo_link = this.state.photo_info?.link;

        const Editor = this.props.Thumbnail_Editor;

        //To avoid unecessary request to the aws s3 if there is no photo link available
        aws_s3_url = photo_link ? aws_s3_url : "";

        return  <Enlarged_Single_Photo 
            photo_info={this.state.photo_info}
            aws_s3_url={`${aws_s3_url}`}
            owner_user_account={this.state.owner_user_account}
            visitor_user_account={this.state.visitor_user_account}
            Enlarged_Photo_Editor={Editor?.Enlarged_Photo_Editor}
            album_info={this.state.album_info}
            Get_Albums={this.props.Get_Albums} 
        />;
    }
    
    render(){
        
        const {Request_URLs} = this.context;
        
        let {aws_s3_url} = Request_URLs;
        
        const photo_link = this.state.photo_info?.link;

        const Editor = this.props.Thumbnail_Editor;
        
        //To avoid unecessary request to the aws s3 if there is no photo link available
        aws_s3_url = photo_link ? aws_s3_url : "";
        
        return (
            <div id="single-photo-thumbnail">

                {Editor ?
                    <Editor photo_info={this.state.photo_info} photos_to_be_deleted={this.state.photos_to_be_deleted} />
                    : <></>}

                <div id="photo-thumbnail"
                    style={{
                        backgroundImage: `url('${aws_s3_url}${photo_link}')`
                    }}
                    onClick = {(e)=>{
                            
                        this.props.change_main_display(this.Show_Enlarged_Photo);
                    }}
                >
                    
                
                </div>
                    
            </div>
        );
    }
}

export default Single_Photo;
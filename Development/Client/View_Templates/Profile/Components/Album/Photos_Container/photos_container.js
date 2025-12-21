import React, {Component} from 'react';
import Single_Photo_Thumbnail from './Single_Photo_Thumbnail/single_photo_thumbnail.js';
import './photos_container.less';

class Photos_Container extends Component {

    Single_Photo_Thumbnail = Single_Photo_Thumbnail
    
    constructor(props){
        
        super(props);

        let {owner_user_account, visitor_user_account, album_info, photos} = this.props
        
        this.state = {
            photos,
            album_info,
            owner_user_account,
            visitor_user_account,
            photos_to_be_deleted: {}
        };
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        this.setState(this.props);
    }

    Update_Photos_To_Be_Deleted = (photos_to_be_deleted) => {

        this.setState({ photos_to_be_deleted });
    }
    
    render(){

        let {Single_Photo_Thumbnail: Photo_Thumbnail} = this;
        
        return (
            <div id="photos-container">
                    
                <div id="photo-container-wrapper">
                    
                    <div id="photo-container-title">
                        {this.state.album_info.title}
                    </div>
                    
                    <div id="photos">
                        
                        {this.state.photos.map((photo_info, index)=>{

                            return <div className="photo-thumbnail-wrapper" key={index}>

                                <Photo_Thumbnail
                                    photo_info={photo_info}
                                    owner_user_account={this.state.owner_user_account}
                                    visitor_user_account={this.state.visitor_user_account}
                                    photos_to_be_deleted={this.state.photos_to_be_deleted}
                                    album_info={this.state.album_info}
                                    Get_Albums={this.props.Get_Albums}
                                    change_main_display={this.props.change_main_display}
                                />

                            </div>;

                        })}
                
                    </div>
                                
                </div>      
                    
            </div>
        );
    }
}

export default {Photos_Container, Single_Photo_Thumbnail};
import React, {Component} from 'react';
import Single_Photo_Thumbnail from './Single_Photo_Thumbnail/single_photo_thumbnail.js';
import './photos_container.less';

class Photos_Container extends Component {
    
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

    componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        this.setState(this.props);
    }

    Update_Photos_To_Be_Deleted = (photos_to_be_deleted) => {

        this.setState({ photos_to_be_deleted: photos_to_be_deleted });
    }
    
    render(){

        let Editor = this.props.photos_container_editor;

        let Photo_Thumbnail_Editor = Editor?.Photo_Thumbnail_Editor;
        
        return (
            <div id="photos-container" tabIndex="0">
                    
                <div id="big-close-button" onClick={this.props.Close_Photo_Album}>
                        
                </div>
                    
                <div id="photo-container-wrapper">
                    
                    <div id="photo-container-title">
                        {this.state.album_info.title}
                    </div>

                    {Editor ? <div id="editor-wrapper">
                        <Editor photo_links={this.state.photos}
                            album_info={this.state.album_info}
                            owner_user_account={this.state.owner_user_account}
                            visitor_user_account={this.state.visitor_user_account}
                            Close_Photo_Album={this.props.Close_Photo_Album}
                            Get_Albums={this.props.Get_Albums}
                            Get_Photo_Links={this.props.Get_Photo_Links}
                            Update_Photos_To_Be_Deleted={this.Update_Photos_To_Be_Deleted}
                        />
                    </div>
                        : <></>}
                    
                    <div id="photos">
                        
                        {this.state.photos.map((photo_info, index)=>{

                            return <div className="photo-thumbnail-wrapper" key={index}>

                                <Single_Photo_Thumbnail
                                    photo_info={photo_info}
                                    owner_user_account={this.state.owner_user_account}
                                    visitor_user_account={this.state.visitor_user_account}
                                    Thumbnail_Editor={Photo_Thumbnail_Editor}
                                    photos_to_be_deleted={this.state.photos_to_be_deleted}
                                    album_info={this.state.album_info}
                                    Get_Albums={this.props.Get_Albums}
                                />

                            </div>;

                        })}
                
                    </div>
                                
                </div>      
                    
            </div>
        );
    }
}

export default Photos_Container;
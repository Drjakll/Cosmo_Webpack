import React, {Component} from 'react';
import Single_Photo_Thumbnail from './Single_Photo_Thumbnail/single_photo_thumbnail.js';
import Enlarged_Photo_Viewer from '@enlarged_photo_viewer';
import './photos_container.less';

class Photos_Container extends Component {

    Thumbnail = Single_Photo_Thumbnail

    Photos_To_Be_Deleted = null
    Insert_Photo_To_Delete = null
    
    constructor(props){
        
        super(props);

        let {owner_user_account, visitor_user_account, album_info, photo_links} = this.props
        
        this.state = {
            photo_links,
            album_info,
            owner_user_account,
            visitor_user_account,
            photos_to_be_deleted: {},
            enlarged_photo_view: false,
            initial_photo_index: null
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

    Exit_Enlarge_Photo_Viewer = ()=>{
        
        this.setState({
            enlarged_photo_view: false,
            initial_photo_index: null
        });
    }

    Open_Enlarged_Photo_Viewer = (initial_photo_index) =>{

        this.setState({
            enlarged_photo_view: true,
            initial_photo_index
        });
    }
    
    render(){

        let {Thumbnail, Insert_Photo_To_Delete} = this;

        let {owner_user_account, 
                visitor_user_account, 
                photos_to_be_deleted, 
                album_info, 
                photo_links, 
                enlarged_photo_view,
                initial_photo_index
            } = this.state;

        let {Get_Albums, change_main_display} = this.props;
        
        return (
            <div id="photos-container">

                {enlarged_photo_view ? <Enlarged_Photo_Viewer 
                                            exit={this.Exit_Enlarge_Photo_Viewer} 
                                            initial_photo_index={initial_photo_index}
                                            photo_info_array={photo_links}
                                        /> : ""}
                    
                <div id="photo-container-wrapper">
                    
                    <div id="photo-container-title">
                        {album_info.title}
                    </div>

                    <div id="photo-container-description">

                        <label>Description</label>

                        <div id="description-content">
                            {album_info.brief_description}
                        </div>

                    </div>
                    
                    <div id="photos">
                        
                        {photo_links.map((photo_info, index)=>{

                            let {id} = photo_info;

                            return <div className="photo-thumbnail-wrapper" key={index}>

                                <Thumbnail
                                    photo_info={photo_info}
                                    owner_user_account={owner_user_account}
                                    visitor_user_account={visitor_user_account}
                                    photos_to_be_deleted={photos_to_be_deleted}
                                    album_info={album_info}
                                    Get_Albums={Get_Albums}
                                    change_main_display={change_main_display}
                                    insert_photo_to_delete={Insert_Photo_To_Delete}
                                    open_enlarged_photo_viewer={this.Open_Enlarged_Photo_Viewer}
                                    index={index}
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
import React, {Component} from 'react';
import Single_Photo_Thumbnail from './Single_Photo_Thumbnail/single_photo_thumbnail.js';
import Enlarged_Photo_Viewer from '@enlarged_photo_viewer';
import Image_Container from '@image_container';
import './photos_container.less';

class Photos_Container extends Component {

    Thumbnail = Single_Photo_Thumbnail

    Photos_To_Be_Deleted = null
    Insert_Photo_To_Delete = null
    
    constructor(props){
        
        super(props);

        let {owner_user_account, visitor_user_account, album_info, photo_links, visitor_all_following_status} = this.props;

        photo_links = this.Modify_Photo_Links(photo_links);
        
        this.state = {
            photo_links,
            album_info,
            owner_user_account,
            visitor_user_account,
            visitor_all_following_status,
            photos_to_be_deleted: {},
            enlarged_photo_view: false,
            initial_photo_index: null
        };
    }

    componentDidMount(){

        this.Modify_Photo_Links(this.state.photo_links);
        
    }

    Modify_Photo_Links = (photo_links)=>{

        for(let i = 0; i < photo_links.length; i++){

            photo_links[i].custom_frame = this.Regular_Image_Frame;

        }

        return photo_links
    }

    async componentDidUpdate(prevProps, prevState) {

        let {photo_links, album_info, visitor_all_following_status} = this.props;

        if (photo_links === prevProps.photo_links && album_info === prevProps.album_info) {
            return;
        }


        photo_links = this.Modify_Photo_Links(photo_links);

        await this.setState({album_info, photo_links, visitor_all_following_status});
    }

    Exit_Enlarge_Photo_Viewer = ()=>{
        
        this.setState({
            enlarged_photo_view: false,
            initial_photo_index: null
        });
    }

    //initial_photo_index is which photo gets to see first when the enlarged_photo_view opens
    Open_Enlarged_Photo_Viewer = (initial_photo_index) =>{

        this.setState({
            enlarged_photo_view: true,
            initial_photo_index
        });
    }

    //To be replaced by the inheriter
    Custom_Uploading_Progress_Frame = null;

    Regular_Image_Frame = ({photo, index}) => {

        const {Thumbnail, Insert_Photo_To_Delete} = this;

        const {Get_Albums, change_main_display} = this.props;

        let {owner_user_account, 
                visitor_user_account, 
                photos_to_be_deleted, 
                album_info, 
                visitor_all_following_status
            } = this.state;

        return <div className="photo-thumbnail-wrapper" key={index}>

            <Thumbnail
                photo_info={photo}
                owner_user_account={owner_user_account}
                visitor_user_account={visitor_user_account}
                photos_to_be_deleted={photos_to_be_deleted}
                album_info={album_info}
                Get_Albums={Get_Albums}
                change_main_display={change_main_display}
                insert_photo_to_delete={Insert_Photo_To_Delete}
                open_enlarged_photo_viewer={this.Open_Enlarged_Photo_Viewer}
                index={index}
                visitor_all_following_status={visitor_all_following_status}
            />

        </div>;
    }
    
    render(){

        let {Exit_Enlarge_Photo_Viewer} = this;

        let { initial_photo_index, photo_links, enlarged_photo_view, album_info } = this.state;
        
        return (
            <div id="photos-container">

                {enlarged_photo_view ? <Enlarged_Photo_Viewer 
                                            exit={Exit_Enlarge_Photo_Viewer} 
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

                    <div id="view-slide-show-label">

                        <label onClick={(e)=>{

                            this.Open_Enlarged_Photo_Viewer(0);

                        }}>View in Slide Show</label>

                    </div>
                    
                    <div id="photos">
                        
                        <Image_Container images={photo_links} />
                
                    </div>
                                
                </div>      
                    
            </div>
        );
    }
}

export default Photos_Container;
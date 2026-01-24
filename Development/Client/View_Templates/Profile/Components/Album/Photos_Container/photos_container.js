import React, {Component} from 'react';
import Single_Photo_Thumbnail from './Single_Photo_Thumbnail/single_photo_thumbnail.js';
import './photos_container.less';

class Photos_Container extends Component {

    Thumbnail = Single_Photo_Thumbnail.Single_Photo 

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
    
    render(){

        let {Thumbnail, Insert_Photo_To_Delete} = this;

        let {owner_user_account, visitor_user_account, photos_to_be_deleted, album_info, photo_links} = this.state;

        let {Get_Albums, change_main_display} = this.props;
        
        return (
            <div id="photos-container">
                    
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

                                <div id="photo-select-button" 
                                    onClick={(e)=>{ this.Insert_Photo_To_Delete(photo_info)}}
                                    className={photos_to_be_deleted[id] ? "selected-to" : ""}
                                >

                                </div>

                                <Thumbnail
                                    photo_info={photo_info}
                                    owner_user_account={owner_user_account}
                                    visitor_user_account={visitor_user_account}
                                    photos_to_be_deleted={photos_to_be_deleted}
                                    album_info={album_info}
                                    Get_Albums={Get_Albums}
                                    change_main_display={change_main_display}
                                    insert_photo_to_delete={Insert_Photo_To_Delete}
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
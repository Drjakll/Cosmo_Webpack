import React, {Component} from 'react';
import Single_Photo_Thumbnail from './Single_Photo_Thumbnail/single_photo_thumbnail.js';
import './photos_container.less';

class Photos_Container extends Component {
    
    constructor(props){
        
        super(props);
        
        this.state = {
            photos: this.props.photos,
            album_info: this.props.album_info,
            account_data: this.props.account_data
        };
    }
    
    
    render(){
        
        return (
                <div id="photos-container">
                    
                    <div id="big-close-button" onClick={this.props.Close_Photo_Album}>
                        
                    </div>
                    
                    <div id="photo-container-wrapper">
                    
                        <div id="photo-container-title">
                            {this.state.album_info.title}
                        </div>
                    
                        <div id="photos">
                        
                            {this.state.photos.map((photo_info, index)=>{

                                return <div className="photo-thumbnail-wrapper" key={index}>

                                    <Single_Photo_Thumbnail photo_info={photo_info} account_data={this.state.account_data}/>

                                </div>;

                            })}
                
                        </div>
                                
                    </div>      
                    
                </div>
            );
    }
}

export default Photos_Container;
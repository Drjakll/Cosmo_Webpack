import React, {Component} from 'react';
import Photo_Comments from './Photo_Comments/photo_comments.js';
import Comments_Container from '@comments_container';
import './enlarged_single_photo.less';

class Enlarged_Single_Photo extends Component {

    Photo_Comments = Photo_Comments

    Render_Option_Buttons = null;
    
    constructor(props){
        
        super(props);

        let {owner_user_account, visitor_user_account, photo_info, aws_s3_url, album_info} = this.props;
        
        this.state = {
            photo_info,
            aws_s3_url,
            owner_user_account,
            visitor_user_account,
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
    
    render() {

        let {Photo_Comments: Comments} = this;

        let { Enlarged_Photo_Editor } = this.props;

        let Comment_Editor = Enlarged_Photo_Editor?.Comment_Editor;

        let {photo_info} = this.state;
        
        return <div id="enlarged-single-photo-wrapper">

            <div id="enlarged-single-photo">

                <div id="enlarged-photo-wrapper">

                    <div id="photo-editor-wrapper">{this.Render_Option_Buttons && this.Render_Option_Buttons()}</div>

                    <div id="enlarged-photo"
                        style={{
                            backgroundImage: `url('${this.state.aws_s3_url}${photo_info.link}')`
                        }}
                    >

                    </div>

                </div>

                <div id="comments-area-wrapper">

                    <Comments_Container
                        reply_to_id={null}
                        target_id={photo_info.id}
                        target_type={"photo"}
                        visitor_user_account={this.state.visitor_user_account}
                        owner_user_account={this.state.owner_user_account}
                        parent_room_name={null}
                    />

                </div>

            </div>

        </div>;
    }
}

export default Enlarged_Single_Photo;
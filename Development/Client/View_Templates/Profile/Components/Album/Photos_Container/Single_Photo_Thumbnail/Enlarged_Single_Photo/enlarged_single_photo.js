import React, {Component} from 'react';
import Photo_Comments from './Photo_Comments/photo_comments.js';
import './enlarged_single_photo.less';

class Enlarged_Single_Photo extends Component {
    
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
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    render() {

        let { Enlarged_Photo_Editor } = this.props;

        let Comment_Editor = Enlarged_Photo_Editor?.Comment_Editor;
        
        return <div id="enlarged-single-photo-wrapper">

            <div id="enlarged-single-photo-exit-button" onClick={(e) => { this.props.exit_enlarge_mode(); }}>

            </div>

            <div id="enlarged-single-photo">

                <div id="enlarged-photo-wrapper">

                    {Enlarged_Photo_Editor ?

                        <div id="photo-editor-wrapper">
                            <Enlarged_Photo_Editor
                                photo_info={this.state.photo_info}
                                album_info={this.state.album_info}
                                Get_Albums={this.props.Get_Albums}
                            />
                        </div>

                        : <></>}

                    <div id="enlarged-photo"
                        style={{
                            backgroundImage: `url('${this.state.aws_s3_url}${this.state.photo_info.link}')`
                        }}
                    >

                    </div>

                </div>

                <div id="comments-area-wrapper">

                    <Photo_Comments
                        photo_info={this.state.photo_info}
                        visitor_user_account={this.state.visitor_user_account}
                        owner_user_account={this.state.owner_user_account}
                        Comment_Editor={Comment_Editor} />

                </div>

            </div>

        </div>;
    }
}

export default Enlarged_Single_Photo;
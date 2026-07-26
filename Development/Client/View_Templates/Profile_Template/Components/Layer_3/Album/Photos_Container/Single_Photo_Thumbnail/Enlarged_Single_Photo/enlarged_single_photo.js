import React, {Component} from 'react';
import Comments_Container from '@comments_container';
import General_Reaction_Container from '@general_reactions_container';
import Request_URLs from '@request_urls';
import './enlarged_single_photo.less';

class Enlarged_Single_Photo extends Component {

    Comments = Comments_Container

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

    async componentDidMount(){

        await this.Refresh_Reactions();

    }    
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
        
    }

    Refresh_Reactions = async ()=>{

        let {get_photo_links} = Request_URLs;

        let {id} = this.state.photo_info;

        let data = await( await fetch(
            get_photo_links,
            {
                method: "POST",
                body: JSON.stringify({id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        let {targets, reactions} = data?.results ?? {targets: [], reactions: []};

        let photo_info = targets.length ? targets[0] : {};

        photo_info.reactions = reactions;
        
        await this.setState({photo_info});

    }
    
    render() {

        let {photo_info, visitor_user_account, owner_user_account} = this.state;

        let {Comments} = this;
        
        return <div id="enlarged-single-photo-wrapper">

            <div id="enlarged-single-photo">

                <div id="enlarged-photo-wrapper">

                    <div id="photo-editor-wrapper">{this.Render_Option_Buttons && this.Render_Option_Buttons()}</div>

                    <div id="enlarged-photo"
                        style={{
                            backgroundImage: `url('${this.state.aws_s3_url}${photo_info.link.replace(/\?/g, "%3F")}')`
                        }}
                    >

                    </div>

                    <div id="reactions-wrapper">

                        <General_Reaction_Container 
                            visitor_user_account={visitor_user_account} 
                            owner_user_account={owner_user_account} 
                            reactions={photo_info.reactions} 
                            target_id={photo_info.id}
                            target_id_type={"photo_id"}
                            refresh_parent={null}
                        />

                    </div>

                </div>

                <div id="comments-area-wrapper">

                    <Comments
                        reply_to_id={null}
                        target_id={photo_info.id}
                        target_id_type={"photo_id"}
                        visitor_user_account={this.state.visitor_user_account}
                        owner_user_account={this.state.owner_user_account}
                        parent_room_name={null}
                        comments_count={photo_info.comments_count}
                    />

                </div>

            </div>

        </div>;
    }
}

export default Enlarged_Single_Photo;
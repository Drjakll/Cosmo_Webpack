import React, {Component} from 'react';
import Reply_To_Comment from './Reply_To_Comment/reply_to_comment.js';
import Likes from './Likes/likes.js';
import Dislikes from './Dislikes/dislikes.js';
import Emojis from './Emojis/emojis.js';
import Context from '@context/context.js';
import './single_comment.less';

class Single_Comment extends Component {
    
    constructor(props){
        
        super(props);

        let {comment, visitor_user_account} = this.props;
        
        this.state = {
            comment,
            visitor_user_account
        };
        
        Single_Comment.contextType = Context;
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        let properties = this.props;
        
        for(let i in properties){
            
            this.state[i] = properties[i];
            
        }
        
        this.setState(this.state);
    }

    Apply_Props = (prop_type)=>{

        let {comment, visitor_user_account} = this.state;

        let {email, profile_picture_link, first_name, last_name} = visitor_user_account;

        let props = {likes: JSON.parse(comment.likes) || comment.likes, dislikes: JSON.parse(comment.dislikes) || comment.dislikes};
        
        if(prop_type === "likes"){

            if(props.likes[email]){

                delete props.likes[email];

            } else {

                delete props.dislikes[email];

                props.likes[email] = {profile_picture_link, first_name, last_name};
            }

        } else {

            if(props.dislikes[email]){

                delete props.dislikes[email];

            } else {

                delete props.likes[email];

                props.dislikes[email] = {profile_picture_link, first_name, last_name};

            }

        }

        comment.likes = JSON.stringify(props.likes);
        comment.dislikes = JSON.stringify(props.dislikes);

        this.setState({
            comment
        });

        this.props.update_comment && this.props.update_comment(comment);
    }
    
    render(){
        
        const {Request_URLs} = this.context;
        const { aws_s3_url } = Request_URLs;

        const { Comment_Editor, reload_comments, delete_comment, socket } = this.props;

        let {comment} = this.state;

        return <div id="single-comment-wrapper" className={`${this.state.comment.reply_to_comment ? "active-reply" : ""}`}>

            {Comment_Editor ?
                <div id="comment-editor-wrapper">
                    <Comment_Editor
                        comment_info={this.state.comment}
                        reload_comments={reload_comments}
                        delete_comment={delete_comment}
                        socket={socket}
                    />
                </div>
                : <></>}
        
            <div id="user-info">

                <div id="profile-picture-wrapper">
                
                    <div id="picture" style={{backgroundImage: `url('${aws_s3_url}${comment.profile_picture_link}')`}}>
        
                    </div>
                
                </div>

                <div id="comment-time-stamp">

                    {new Date(comment.time_stamp).toLocaleString().replace(',', ' ')}

                </div>

            </div>
            
            <div id="single-comment-inner-wrapper">

                <div id="user-info-name">

                    {comment.first_name} {comment.last_name}

                </div>

                <div id="comment-wrapper">
                
                    <div id="reply-wrapper" className={`${comment.reply_to_comment ? 'active' : ''}`}>
                        
                        {JSON.parse(comment.reply_to_comment) ? 
                            <Reply_To_Comment reply={comment.reply_to_comment} /> 
                            : <></>}
                    
                    </div>
                    
                    <pre id="comment">
        
                        {comment.comment}
                        
                    </pre>
                    
                    <div id="comment-responses-wrapper">
                
                        <div id="reply">

                            <label onClick={(e)=>{this.props.set_reply(comment);}}>Reply</label>

                        </div>

                        <div id="props-wrapper">

                            <div id="likes-wrapper">

                                <Likes likes={comment.likes} apply_props={this.Apply_Props} />

                            </div>

                            <div id="dislikes-wrapper">

                                <Dislikes dislikes={comment.dislikes} apply_props={this.Apply_Props} />

                            </div>

                        </div>

                        <div id="emojis-wrapper">
                        
                            <Emojis emojis={comment.emojis} />
                        
                        </div>

                    </div>
                    
                </div>
            
            </div>
            
        </div>;
    }
}

export default Single_Comment;
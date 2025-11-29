import React, {Component} from 'react';
import Reply_To_Comment from './Reply_To_Comment/reply_to_comment.js';
import './single_comment.less';

class Single_Comment extends Component {
    
    constructor(props){
        
        super(props);
        
        this.state = {
            comment: this.props.comment
        };
        
        Single_Comment.contextType = window.Context;
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
    
    render(){
        
        const {Request_URLs} = this.context;
        const { aws_s3_url } = Request_URLs;

        const { Comment_Editor, reload_comments, delete_comment, socket } = this.props;

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
                
                    <div id="picture" style={{backgroundImage: `url('${aws_s3_url}${this.state.comment.profile_picture_link}')`}}>
        
                    </div>
                
                </div>

            </div>
            
            <div id="single-comment-inner-wrapper">

                <div id="user-info-name">

                    {this.state.comment.first_name} {this.state.comment.last_name}

                </div>

                <div id="comment-wrapper">
                
                    <div id="reply-wrapper" className={`${this.state.comment.reply_to_comment ? 'active' : ''}`}>
                        
                        {this.state.comment.reply_to_comment ? 
                            <Reply_To_Comment reply={this.state.comment.reply_to_comment} /> 
                            : <></>}
                    
                    </div>
                    
                    <pre id="comment">
        
                        {this.state.comment.comment}
                        
                    </pre>
                    
                    <div id="comment-responses-wrapper">
                
                        <div id="reply">

                            <label onClick={(e)=>{this.props.set_reply(this.state.comment);}}>Reply</label>

                        </div>

                        <div id="emojis">
                        
                        
                        </div>

                    </div>
                    
                </div>
            
            </div>
            
        </div>;
    }
}

export default Single_Comment;
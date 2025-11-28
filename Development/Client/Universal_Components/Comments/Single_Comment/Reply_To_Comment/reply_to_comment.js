import React, {Component} from 'react';
import './reply_to_comment.less';

class Reply_To_Comment extends Component {
    
    constructor(props){
        
        super(props);
        
        this.state = {
            reply: JSON.parse(this.props.reply)
        };
        
        Reply_To_Comment.contextType = window.Context;
    }
    
    render(){
        
        const {Request_URLs} = this.context;
        
        const {aws_s3_url} = Request_URLs;
        
        return <div id="reply-to-comment">
            
            <div id="profile-info">
                <div id="label">Response to: </div>
                <div id="profile-name">{this.state.reply.first_name} {this.state.reply.last_name} </div>
            </div>
            
            <div id="reply-inner-wrapper">
            
                <div id="profile-picture-wrapper">
                    
                    <div id="profile-picture" 
                        style={{backgroundImage: `url('${aws_s3_url}${this.state.reply.profile_picture_link}')`}}>
        
                    </div>
                    
                </div>
                
                <div id="reply-comment-wrapper">
                
                    <pre id="comment-reply">

                        {this.state.reply.comment}

                    </pre>
                    
                </div>

            </div>
            
        </div>;
    }
}

export default Reply_To_Comment;
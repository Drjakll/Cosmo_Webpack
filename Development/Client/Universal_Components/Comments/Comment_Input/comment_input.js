import React, {Component, createRef} from 'react';
import Reply_To_Comment_Quote from './Reply/reply.js';
import Context from '@context/context.js';
import './comment_input.less';

class Comment_Input extends Component {
    
    commentRef = createRef();
    
    constructor(props){
        
        super(props);

        let {user_account, reply_to_comment} = this.props;
        
        this.state = {
            user_account,
            reply_to_comment
        };
        
        Comment_Input.contextType = Context;
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    Submit_Comment = async () => {
        
        const comment = this.commentRef.current.textContent;

        if(comment === "" || !comment || comment.replace(' ', '') === ''){
            alert("Comment cannot be empty");
            return;
        }

        let {user_account, reply_to_comment} = this.state;

        let {submit_comment} = this.props;
                        
        await submit_comment({comment, reply_to_comment, user_account});

        this.commentRef.current.textContent = '';
        
    }
    
    Close_Reply = ()=>{

        this.setState({reply_to_comment: null});

    }
    
    render(){
        
        return <div id="comment-input-wrapper">
        
            <div id="reply-to-comment-box-wrapper" className={`${this.state.reply_to_comment ? 'active': ''}`}>
                
                {this.state.reply_to_comment ? 
                <Reply_To_Comment_Quote reply_to_comment={this.state.reply_to_comment} close_reply={this.Close_Reply}/> 
                : <></>}
                
            </div>
            
            <div id="comment-box-wrapper">
            
                <div id="comment-text-wrapper">
        
                    <pre id="comment" ref={this.commentRef} contentEditable={true}>
                        
                    </pre>
        
                </div>
                
                <div id="comment-buttons-wrapper">
                
                    <div id="send-button" onClick={this.Submit_Comment}>
                        Submit
                    </div>
        
                </div>
            
            </div>  
            
        </div>;
    }
}

export default Comment_Input;
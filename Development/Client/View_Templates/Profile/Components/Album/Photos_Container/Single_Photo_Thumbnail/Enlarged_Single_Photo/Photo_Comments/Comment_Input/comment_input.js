import React, {Component, createRef} from 'react';
import Reply_To_Comment_Quote from './Reply/reply.js';
import './comment_input.less';

class Comment_Input extends Component {
    
    commentRef = createRef();
    
    constructor(props){
        
        super(props);
        
        this.state = {
            account_data: this.props.account_data,
            photo_info: this.props.photo_info,
            reply_to_comment: this.props.reply_to_comment
        };
        
        Comment_Input.contextType = window.Context;
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
    
    Submit_Comment = async () => {
        
        const comment = this.commentRef.current.textContent;
        const reply_to_comment = this.state.reply_to_comment;
        const account_data = this.state.account_data;
        const photo_info = this.state.photo_info;

        if(comment === "" || !comment || comment.replace(' ', '') === ''){
            alert("Comment cannot be empty");
            return;
        }
        
        const {Comment_Data_Templates, Request_URLs} = this.context;
        
        let comment_object = Comment_Data_Templates.Photo_Comment_Data_Template(account_data);
        
        comment_object.comment = comment;
        comment_object.belongs_to_photo_id = photo_info.id;
        comment_object.reply_to_comment = reply_to_comment ? JSON.stringify(reply_to_comment) : null;
        
        let res = await fetch(Request_URLs.submit_photo_comment, {
            method: "POST",
            body: JSON.stringify(comment_object),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        let resJson = await res.json();
        
        this.props.Get_Photo_Comments();
        
        this.props.socket.emit('submit_comment', this.state.photo_info.id);
        
        this.commentRef.current.textContent = "";
        
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
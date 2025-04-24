import React, {Component} from 'react';
import Reply_To_Comment_Quote from './Reply_To_Comment_Quote/reply_to_comment_quote.js';
import './comment_input.less';

class Comment_Input extends Component {
    
    constructor(props){
        
        super(props);
        
        this.state = {
            comment_to_be_sent: "",
            account_data: this.props.account_data,
            photo_info: this.props.photo_info,
            reply_to_comment: null
        };
        
        Comment_Input.contextType = window.Context;
    }
    
    Update_Comment = (element) => {
        
        this.setState({comment_to_be_sent: element.textContent});
        
    }
    
    Submit_Comment = async () => {
        
        const comment = this.state.comment_to_be_sent;
        const reply_to_comment = this.state.reply_to_comment;
        const account_data = this.state.account_data;
        const photo_info = this.state.photo_info;
        
        if(comment === "" || !comment){
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
        
        console.log(resJson?.message);
        
    }
    
    render(){
        
        return <div id="comment-input-wrapper">
        
            <div id="reply-to-comment-box-wrapper" className={`${this.state.reply_to_comment ? 'active': ''}`}>
                
                {this.state.reply_to_comment ? <Reply_To_Comment_Quote reply_to_comment={this.state.reply_to_comment} /> : <></>}
                
            </div>
            
            <div id="comment-box-wrapper">
            
                <div id="comment-text-wrapper">
        
                    <div id="comment" onKeyDown={(e)=>{this.Update_Comment(e.target);}} contentEditable={true}>
                        
                    </div>
        
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
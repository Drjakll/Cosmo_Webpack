import React, {Component} from 'react';

class Reply_To_Comment_Quote extends Component {
    
    constructor(props){
        
        super(props);
        
        this.state = {
            reply_to_comment: this.props.reply_to_comment
        };
    }
    
    render(){
        
        return <div id="reply-to-comment-quote-wrapper">
        
            
        
        </div>;
    }
}

export default Reply_To_Comment_Quote;
import React, {Component} from 'react';
import './reply.less';

class Reply_To_Comment_Quote extends Component {
    
    constructor(props){
        
        super(props);
        
        this.state = {
            reply_to_comment: this.props.reply_to_comment
        };
        
        Reply_To_Comment_Quote.contextType = window.Context;
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    render(){
        
        const {Request_URLs} = this.context;
        
        const {aws_s3_url} = Request_URLs;
        
        const {profile_picture_link, comment, first_name, last_name} = this.state.reply_to_comment;
        
        return <div id="reply-to-comment-quote-wrapper">
        
                
            <div id="close-reply-button" onClick={(e) => { this.props.close_reply(); }}>

                <label>x</label>

            </div>
        
            <div id="reply-info">
                
                <div id="label"> 
                
                    Response to: 
                
                </div>
                
                <div id="profile-name">
                    {first_name} {last_name}
                </div>
                
            </div>
            
            <div id="reply-comment-area-wrapper">
                
                <div id="profile-picture-wrapper">
                
                    <div id="profile-picture" 
                        style={{backgroundImage: `url('${aws_s3_url}${profile_picture_link}')`}}>

                    </div>
                    
                </div>
                
                <div id="reply-wrapper">

                    <pre id="reply">

                        "{comment}"

                    </pre>

                </div>

            </div>
            
        </div>;
    }
}

export default Reply_To_Comment_Quote;
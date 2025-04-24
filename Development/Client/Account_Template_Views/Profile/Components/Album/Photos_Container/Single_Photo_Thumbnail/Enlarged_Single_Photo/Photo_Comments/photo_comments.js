import React, {Component} from 'react';
import { io } from 'socket.io-client';
import Comment_Input from './Comment_Input/comment_input.js';
import Single_Comment from './Single_Comment/single_comment.js';
import './photo_comments.less';

class Photo_Comments extends Component {
    
    constructor(props){
        
        super(props);
        
        Photo_Comments.contextType = window.Context;
        
        this.state = {
            photo_info: this.props.photo_info,
            photo_comments: [],
            account_data: this.props.account_data
        };
    }
    
    componentDidMount(){
        
        this.socket = io('/photo_comments');
        
        this.socket.on('connect', ()=>{
            
            this.socket.emit('join_comment_group', this.state.photo_info.id);
        });
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
    
    Get_Photo_Comments = async ()=>{
     
        const {Request_URLs} = this.context;
        
        const {get_photo_comments} = Request_URLs;
        
        let res = await fetch(get_photo_comments, {
           method: "POST",
           body: JSON.stringify(this.state.photo_info),
           headers: {
               'Content-Type': "application/json"
           }
        });
        
        let resJson = await res.json();
        
        let {photo_comments} = resJson;
        
        this.setState({photo_comments: photo_comments});
        
    }

    
    render(){
        
        return <div id="photo-comments-wrapper">
        
            <div id="comments-list-area">
        
                
        
            </div>
            
            <div id="comment-input-area">
        
                <Comment_Input account_data={this.state.account_data} photo_info={this.state.photo_info}/>
        
            </div>
            
        </div>;
    }
}

export default Photo_Comments;
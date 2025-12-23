import React, {Component} from 'react';
import { io } from 'socket.io-client';
import Context from '@context/context.js';
import './photo_comments.less';

class Photo_Comments extends Component {
    
    constructor(props){
        
        super(props);
        
        Photo_Comments.contextType = Context;

        let {photo_info, visitor_user_account, owner_user_account} = this.props;
        
        this.state = {
            photo_info,
            photo_comments: [],
            visitor_user_account,
            owner_user_account,
            reply_to_comment: null
        };


    }
    
    componentDidMount(){
        
        this.socket = io('/photo_comments');
        
        this.socket.on('connect', ()=>{
            
            this.socket.emit('join_comment_group', {photo_id: this.state.photo_info.id});
            
            this.socket.on('reload_comments', (data)=>{
                
                this.Get_Photo_Comments();
                
            });
            
        });
        
        this.Get_Photo_Comments();
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

        console.log(photo_comments);
        
        this.setState({photo_comments: photo_comments});
        
    }

    Delete_Photo_Comment = async (comment_info)=>{

        let { Request_URLs } = this.context;

        let { delete_photo_comment } = Request_URLs;

        let res = await (await fetch(
            delete_photo_comment,
            {
                method: "POST",
                body: JSON.stringify(comment_info),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();

       this.socket.emit('reload_comments_to_all', this.state.photo_info.id);
    }
    
    Set_Reply = (reply) => {
        
        this.setState({reply_to_comment: reply});
    }

    Submit_Comment = async ({comment, reply_to_comment, user_account}) => {

        const photo_info = this.state.photo_info;
        
        const {Comment_Data_Templates, Request_URLs} = this.context;
        
        let comment_object = Comment_Data_Templates.Photo_Comment_Data_Template(user_account);
        
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
        
        this.Get_Photo_Comments();
        
        this.socket.emit('reload_comments_to_all', this.state.photo_info.id);
        
    }

    Update_Comment = async (comment)=>{

        const {update_photo_comment} = this.context.Request_URLs;

        let res = await(await fetch(
            update_photo_comment,
            {
                method: "POST",
                body: JSON.stringify(comment),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        this.socket.emit('reload_comments_to_all', post_info.id);
    }
    
    render() {

        let { Comment_Editor } = this.props;

        let {Single_Comment} = this.context;

        let {Comment_Input} = this.context;
        
        return <div id="photo-comments-wrapper">

            <div id="comment-header">

                Comments

            </div>
        
            <div id="comments-list-area">
        
                {this.state.photo_comments.map((comment, index)=>{
                    
                    return <div className="comment-wrapper" key={index}>
                        
                        <Single_Comment
                            comment={comment}
                            set_reply={this.Set_Reply}
                            Comment_Editor={Comment_Editor}
                            reload_comments={this.Get_Photo_Comments}
                            delete_comment={this.Delete_Photo_Comment}
                            visitor_user_account={this.state.visitor_user_account}
                            update_comment={this.Update_Comment}
                        />
                        
                    </div>;
                    
                })}
        
            </div>
            
            <div id="comment-input-area">
        
                <Comment_Input user_account={this.state.visitor_user_account}
                                reply_to_comment={this.state.reply_to_comment}
                                submit_comment={this.Submit_Comment}
                            />
        
            </div>
            
        </div>;
    }
}

export default Photo_Comments;
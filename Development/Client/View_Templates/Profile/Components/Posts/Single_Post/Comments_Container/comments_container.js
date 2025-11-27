import React, { Component, createRef } from 'react';
import Context from '@context/context.js';
import './comments_container.less';

class Comments_Container extends Component {

    static contextType = Context;
    
    postBodyRef = createRef();

    constructor(props){
        super(props);

        let {post, owner_user_account, visitor_user_account, Comment_Editor, post_comments} = this.props;

        this.state = {
            post,
            post_comments,
            Comment_Editor,
            owner_user_account,
            visitor_user_account,
            reply_to_comment: null
        };
    }

    componentDidMount(){

        this.postBodyRef.current?.innerHTML = this.state.post.body;

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);

        this.postBodyRef.current?.innerHTML = this.props.post?.body;
    }

    Delete_Post_Comment = async (comment_info)=>{

        let { Request_URLs } = this.context;

        let { delete_post_comment } = Request_URLs;

        let res = await (await fetch(
            delete_post_comment,
            {
                method: "POST",
                body: JSON.stringify(comment_info),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();
    }

    Submit_Comment = async ({comment, reply_to_comment, user_account}) => {

        const post_info = this.state.post;
        
        const {Comment_Data_Templates, Request_URLs} = this.context;
        
        let comment_object = Comment_Data_Templates.Post_Comment_Data_Template(user_account);
        
        comment_object.comment = comment;
        comment_object.belongs_to_post_id = post_info.id;
        comment_object.reply_to_comment = reply_to_comment && JSON.stringify(reply_to_comment);
        
        let response = await fetch(Request_URLs.submit_post_comment, {
            method: "POST",
            body: JSON.stringify(comment_object),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        await this.props.get_post_comments();
        
        this.props.socket.emit('submit_comment', post_info.id);
        
    }

    Set_Reply = (reply) => {
        
        this.setState({reply_to_comment: reply});
    }

    render(){

        let {post, Comment_Editor} = this.state;

        let {title, date_created} = post || {};

        let {Comment_Input, Single_Comment} = this.context;

        return (
            <div id="comments-container">

                <div id="post-wrapper">

                    <div id="post-inner-wrapper">

                        <div id="post-title">

                            <pre>{title}</pre> 

                        </div>

                        <div id="post-body">

                            <pre ref={this.postBodyRef}>

                            </pre>

                        </div>

                        <div id="post-date-created">

                            {this.props.generate_beautiful_date(date_created)}

                        </div>

                    </div>
                    
                </div>

                <div id="comments-section-wrapper">

                    <div id="comments-section-title">

                        Comments

                    </div>

                    <div id="comments-section-inner-wrapper">

                        {this.state.post_comments.map((comment, index)=>{
                            
                            return <div className="comment-wrapper" key={index}>
                                
                                <Single_Comment
                                    comment={comment}
                                    set_reply={this.Set_Reply}
                                    Comment_Editor={Comment_Editor}
                                    reload_comments={this.props.get_post_comments}
                                    delete_comment={this.Delete_Post_Comment}
                                />
                                
                            </div>;
                            
                        })}                        

                    </div>

                    <div id="comment-input-wrapper">

                        <Comment_Input 
                            user_account={this.state.visitor_user_account}
                            reply_to_comment={this.state.reply_to_comment}
                            submit_comment={this.Submit_Comment}
                        />

                    </div>

                </div>
                

            </div>
        );
    }   
}

export default Comments_Container;
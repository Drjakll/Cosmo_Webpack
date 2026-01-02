import React, {Component} from 'react';
import Context from '@context/context.js';
import Comments_Container from '../../Comments_Container/comments_container.js';
import './comment_container.less';

class Comment_Container extends Component {

    Reaction_Icon_Names = [
        "angry",
        "laugh",
        "sad",
        "surprised",
        "sympathetic",
        "passionate"
    ]

    static contextType = Context;

    constructor(props){

        super(props);

        let {comment_info, owner_user_account, visitor_user_account, previous_reply} = props;

        this.state = {
            comment_info,
            owner_user_account,
            visitor_user_account,
            show_replies: false,
            previous_reply
        };
    }

    Show_Replies = ()=>{

        let {back_previous, show_replies, target_id, target_type} = this.props;

        let callback = () =>{

            let {comment_info, owner_user_account, visitor_user_account} = this.state;

            let {id} = comment_info;

            return <div id="reply-to-comment-wrapper">

                <div onClick={back_previous}>

                    <label>Back</label>

                </div>

                <div id="original-comment-wrapper">

                    {this.Show_This_Comment(true)}

                </div>

                <div id="replies-to-comment-container">

                    <Comments_Container 
                        back_previous={back_previous} 
                        show_replies={show_replies} 
                        reply_to_id={id}
                        target_id={target_id}
                        target_type={target_type}
                        owner_user_account={owner_user_account}
                        visitor_user_account={visitor_user_account}
                    />

                </div>

            </div>;
        }

        show_replies(callback);
        
    }

    Show_This_Comment = (is_reply = false)=>{

        let {comment_info, owner_user_account, visitor_user_account} = this.state

        let {first_name, last_name, profile_picture_link, id, comment, time_stamp, replies, target_id, target_type} = comment_info;

        let {aws_s3_url} = this.context.Request_URLs;

        return (<div id="comment-container-wrapper">

            <div id="comment-top-section">

                <div id="commenter-name-wrapper">

                    <label>{first_name} {last_name}</label>

                </div>

            </div>

            <div id="comment-middle-section">

                <div id="commenter-profile-picture-wrapper">

                    <img src={`${aws_s3_url}${profile_picture_link}`} />

                </div>

                <div id="comment-display-wrapper">

                    <pre id="the-comment-content">
                        {comment}
                    </pre>

                </div>

            </div>

            <div id="comment-bottom-section">

                <div id="timestamp-wrapper">

                    {new Date(time_stamp).toLocaleString()}

                </div>

                <div id="reply-wrapper">

                    {is_reply ? "" 
                        : 
                        <div id="show-reply-button">

                            <u onClick={this.Show_Replies}>{(replies.length > 1 ? `Replies` : `Reply`) + `(${replies.length})`}</u>

                        </div>
                    }

                </div>

                <div id="reaction-wrapper">



                </div>

            </div>

        </div>);
    }

    render(){

        return (this.Show_This_Comment());
    }
}

export default Comment_Container;
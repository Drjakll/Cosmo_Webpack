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

        let {comment_info, owner_user_account, visitor_user_account} = props;

        this.state = {
            comment_info,
            owner_user_account,
            visitor_user_account
        };
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props !== prevProps){
            this.setState(this.props);
        }
    }

    Show_Replies = ()=>{

        let {back_previous, show_replies, target_id, target_type, reply_to_id} = this.props;

        let callback = () =>{

            let {comment_info, owner_user_account, visitor_user_account} = this.state;

            let parent_room_name = `${target_type}_${target_id}_${reply_to_id ?? 0}`

            let {id} = comment_info;

            return <div id="reply-to-comment-wrapper">

                <div id="the-back-button" onClick={back_previous}>

                    <label>Back</label>

                </div>

                <div id="original-comment-wrapper">

                    <div id="the-original-comment-label">The original comment</div>

                    {this.Show_This_Comment(true)}

                </div>

                <div id="replies-to-comment-container">

                    <Comments_Container 
                        key={comment_info.id}
                        back_previous={back_previous} 
                        show_replies={show_replies} 
                        reply_to_id={id}
                        target_id={target_id}
                        target_type={target_type}
                        owner_user_account={owner_user_account}
                        visitor_user_account={visitor_user_account}
                        parent_room_name={parent_room_name}
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

                            <div onClick={this.Show_Replies}>{replies.length} {replies.length > 1 ? `Replies` : `Reply`}</div>

                        </div>
                    }

                </div>

                <div id="reaction-wrapper">

                    


                </div>

            </div>

        </div>);
    }

    render(){

        return (this.Show_This_Comment(false));
    }
}

export default Comment_Container;
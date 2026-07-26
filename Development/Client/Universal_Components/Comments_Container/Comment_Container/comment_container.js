import React, {Component, createRef} from 'react';
import Comments_Container from '@comments_container';
import Reaction_Container from '@general_reactions_container';
import Profile_Thumbnail from '@profile_thumbnail';
import Request_URLs from '@request_urls';
import Popup_Msg from '@popup_message';
import './comment_container.less';

class Comment_Container extends Component {

    Comments = Comments_Container

    commentRef = createRef()

    constructor(props){

        super(props);

        let {comment_info, owner_user_account, visitor_user_account, selected} = props;

        this.state = {
            comment_info,
            owner_user_account,
            visitor_user_account,
            selected, //Only use by the child, which is an editor use for selecting the comment for potential purposes. Ex: deletion
            editable: false //Can only turn true if the visiting user is the owner of this comment
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

        let {back_previous, show_replies, target_id, target_id_type, reply_to_id, refresh_current_comments} = this.props;

        let {Comments} = this;

        let callback = () =>{

            let {comment_info, owner_user_account, visitor_user_account} = this.state;

            let parent_room_name = `${target_id_type}_${target_id}_${reply_to_id ?? 0}`

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

                    <Comments 
                        key={comment_info.id}
                        back_previous={back_previous} 
                        show_replies={show_replies} 
                        reply_to_id={id}
                        target_id={target_id}
                        target_id_type={target_id_type}
                        owner_user_account={owner_user_account}
                        visitor_user_account={visitor_user_account}
                        parent_room_name={parent_room_name}
                        refresh_current_comments={refresh_current_comments}
                    />

                </div>

            </div>;
        }

        show_replies(callback);
        
    }

    Show_Comment_Editor = ()=>{

        let Delete_This_Comment = async (e)=>{

            let confirmation = {agree: false};

            await Popup_Msg("confirm","Are you sure?", confirmation);

            if(!confirmation.agree){
                return;
            }

            let {delete_comment} = Request_URLs;

            let {id, target_id, target_id_type} = this.state.comment_info;

            let {signal_refresh_this_section_comments, signal_refresh_parent_comments} = this.props;

            let body = {
                id,
                target_id,
                target_id_type
            };

            await fetch(delete_comment,
                {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            signal_refresh_this_section_comments();
            signal_refresh_parent_comments();
        };

        let Turn_Editable = (e)=>{

            this.setState({editable: true});

        };

        let Save_Comment = async (e)=>{

            let {update_comment} = Request_URLs;

            let {visitor_user_account, comment_info} = this.state;

            let {id: user_id} = visitor_user_account;

            let {id, target_id_type, target_id} = comment_info;

            let {signal_refresh_this_section_comments} = this.props;

            let comment = this.commentRef.current.textContent;

            let body = {
                comment,
                user_id,
                id, 
                target_id_type,
                target_id
            };

            await fetch(update_comment,
                {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            this.setState({editable: false});

            signal_refresh_this_section_comments();

        };

        let {editable} = this.state;

        return <div id="comment-editors">

            <div id="edit-button" onClick={editable ? Save_Comment : Turn_Editable}>

                {editable ? "Save" : "Edit"}
                
            </div>

            <div id="delete-button" onClick={Delete_This_Comment}>

                Delete

            </div>

        </div>;
    }

    Show_This_Comment = (is_reply = false)=>{

        let {signal_refresh_this_section_comments, additional_comment_options} = this.props;

        let {comment_info, owner_user_account, visitor_user_account, editable} = this.state

        let {first_name, last_name, profile_picture_link, id, comment, time_stamp, replies, reactions, user_id} = comment_info;

        return (<div id="comment-container-wrapper">

            <div id="comment-top-section">

                <div id="commenter-name-wrapper">

                    <label>{first_name} {last_name}</label>

                </div>

                <pre id="timestamp-wrapper">

                    {new Date(time_stamp).toLocaleString()}

                </pre>

            </div>

            <div id="comment-middle-section">

                <div id="commenter-profile-picture-wrapper">

                    <Profile_Thumbnail
                        visitor_user_account={visitor_user_account}
                        owner_user_account={owner_user_account}
                        profile={{profile_picture_link, id: user_id}}
                        additional_options={additional_comment_options}
                    />

                </div>

                <div id="comment-display-wrapper">

                    <pre id="the-comment-content" contentEditable={editable} ref={this.commentRef}>

                        {comment}

                    </pre>

                </div>

            </div>

            <div id="comment-bottom-section">

                <div id="reply-wrapper">

                    {is_reply ? "" 
                        : 
                        <div id="show-reply-button">

                            <div onClick={this.Show_Replies}>{replies.length} {replies.length > 1 ? `Replies` : `Reply`}</div>

                        </div>
                    }

                </div>

                <div id="reaction-wrapper">

                    {is_reply ? "" :
                        <Reaction_Container 
                            owner_user_account={owner_user_account}
                            visitor_user_account={visitor_user_account}
                            target_id={id}
                            target_id_type={"comment_id"}
                            reactions={reactions}
                            refresh_parent={signal_refresh_this_section_comments}
                        />
                    }

                </div>

                <div id="comment-editor-wrapper">

                    {visitor_user_account.id === comment_info.user_id && !is_reply ? this.Show_Comment_Editor() : ""}

                </div>

            </div>

        </div>);
    }

    render(){

        return (this.Show_This_Comment(false));
    }
}

export default Comment_Container;
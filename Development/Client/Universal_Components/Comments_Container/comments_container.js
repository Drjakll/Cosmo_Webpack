import React, {Component} from 'react';
import Context from '@context/context.js';
import Comment_Input  from './Comment_Input/comment_input.js';
import Comment_Container from './Comment_Container/comment_container.js';
import { io } from 'socket.io-client';
import './comments_container.less';

class Comments_Container extends Component {

    static contextType = Context

    lastScrollPosition = 0;

    //maxComments must be greater than limits_per_request else bug occurs
    maxComments = 100;

    //The limited number of comments per request
    limits_per_request = 25;

    constructor(props){

        super(props);

        let {owner_user_account, visitor_user_account} = props;

        this.state = {
            owner_user_account,
            visitor_user_account,
            comments: [],
            show_current: this.Show_Original,
            previous_callbacks: []
        };
    }

    componentWillUnmount(){

    }

    async componentDidMount(){

        this.Connect_IO();

        let comments = await this.Get_Comments(Date.now(), this.limits_per_request)

        this.setState({
            comments
        });

    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props !== prevProps){

            this.setState(this.props);

        }
    }

    Connect_IO = ()=>{

        this.socket = io('/comment_room');

        this.socket.on('connect', ()=>{

            let {target_id, target_type, reply_to_id} = this.props;

            let room_name = `${target_type}_${target_id}_${reply_to_id ?? 0}`;

            this.socket.emit('join_comment_room', {room_name});

        });

        this.socket.on('reload_a_new_comment', this.Refresh_For_A_New_Comment);
        this.socket.on('reload_all_comments', this.Refresh_Current_Comments);
    }

    Refresh_For_A_New_Comment = async () => {

        let {comments} = this.state;

        comments = comments.concat(await this.Get_Comments(Date.now(), 1, "<", "desc"));

        this.setState({comments});
    }

    Refresh_Current_Comments = async () => {

        let {comments} = this.state;

        let {time_stamp} = comments.length ? comments[0] : {time_stamp: Date.now()};

        this.setState({comments: await this.Get_Comments(time_stamp, this.maxComments, ">=")});

    }

    Get_More_Comments = async (scrolldown = true) => {

        let {comments} = this.state;

        let {time_stamp} = comments.length ? (scrolldown ? comments[comments.length - 1] : comments[0]) : {time_stamp: Date.now()};

        let more_comments = scrolldown ? 
                                comments.concat(await this.Get_Comments(time_stamp, this.limits_per_request, ">")) : 
                                (await this.Get_Comments(time_stamp, this.limits_per_request, "<")).concat(comments);

        

        this.setState({comments: more_comments});
    }

    Get_Comments = async (offset_timestamp, limit = 10, greater_or_less = "<", asc_desc = "asc")=>{
        
        let {target_id, target_type, reply_to_id} = this.props;

        let {get_comments} = this.context.Request_URLs;

        let body ={
            target_id,
            target_type,
            reply_to_id,
            offset_timestamp,
            limit,
            greater_or_less,
            asc_desc
        };

        let data = await(await fetch(
            get_comments,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        )).json();

        return data?.results ?? [];
    }

    Signal_To_Refresh_Comments = ()=>{

        let {target_id, target_type, reply_to_id, parent_room_name} = this.props;

        let room_name = `${target_type}_${target_id}_${reply_to_id ?? 0}`;

        this.socket.emit('signal_all_reload_comment', {room_name});

        if(parent_room_name){
            this.socket.emit('signal_reload_parent_comments', {parent_room_name})
        }
    }

    Show_Replies = (show_callback)=>{

        let {previous_callbacks, show_current} = this.state;

        previous_callbacks.push(show_current);

        show_current = show_callback;

        this.setState({previous_callbacks, show_current});

    }

    Back_Previous = ()=>{

        let {previous_callbacks, show_current} = this.state;

        if(previous_callbacks.length === 0){
            return;
        }

        show_current = previous_callbacks.pop();

        this.setState({previous_callbacks, show_current});
    }

    //Cutting the amount of comments if it excceeds the max number of comments. Reason is to not lag the client's computer if too many comments rendered
    Cut_Comments = async (moving_down = true)=>{

        let {comments} = this.state;

        if(comments.length > this.maxComments){

            let comments_to_cut = comments.length % this.maxComments;

            moving_down ? comments.splice(0, comments_to_cut) : comments.splice(this.maxComments, comments_to_cut);

            this.setState({comments});
        }
    }

    //Get more comments when user scroll down at 75% towards the bottom or scroll up at 25% towards the top
    Scroll_For_More = async (e)=>{

        let {scrollHeight, scrollTop, clientHeight} = e.currentTarget;

        //This will tell whether it's going up or down
        let upOrdown = this.lastScrollPosition - scrollTop;

        this.lastScrollPosition = scrollTop;

        let diff = (scrollHeight - clientHeight);

        if(diff === 0){
            return;
        }

        let percent = scrollTop / diff;

        if(upOrdown >= 0){

            if(percent < 0.25){

                await this.Get_More_Comments(false);
                await this.Cut_Comments(false);
                return;

            }
        }



        if(percent > 0.75){

            await this.Get_More_Comments(true);
            await this.Cut_Comments(true);
        }

    }

    Show_Original = ()=>{

        let {comments, visitor_user_account, owner_user_account} = this.state;

        let {back_previous, show_replies, target_id, target_type, reply_to_id} = this.props;

        //Make sure the children uses the first comment_container.js back_revious and show_replies
        back_previous = back_previous || this.Back_Previous;
        show_replies = show_replies || this.Show_Replies;

        return (<div id="comments-container">

            <div id="comment-header">

                <label>{reply_to_id ? "Replies" : "Comments"}</label>

            </div>

            <div id="comment-values-wrapper" onScroll={this.Scroll_For_More}>

                {comments.map((value, index)=>{

                    return <div className="single-comment-entry" key={value.id}>

                            <Comment_Container 
                                comment_info={value}
                                owner_user_account={owner_user_account} 
                                visitor_user_account={visitor_user_account}
                                back_previous={back_previous} 
                                show_replies={show_replies}
                                target_id={target_id}
                                target_type={target_type}
                                reply_to_id={reply_to_id}   
                            />

                        </div>;

                })}
                
            </div>

            <div id="comment-input-wrapper">

                <Comment_Input 
                    key={reply_to_id ?? 0}
                    owner_user_account={owner_user_account}
                    visitor_user_account={visitor_user_account}
                    Signal_To_Refresh_Comments={this.Signal_To_Refresh_Comments}
                    target_id={target_id}
                    target_type={target_type}
                    reply_to_id={reply_to_id}
                />

            </div>

        </div>);
    }

    render(){

        let {show_current} = this.state;

        return (<div id="comments-container-wrapper">

            {show_current()}

        </div>);

    }
}

export default Comments_Container;
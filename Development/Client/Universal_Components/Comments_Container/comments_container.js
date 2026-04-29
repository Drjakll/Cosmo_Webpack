import React, {Component} from 'react';
import Context from '@context/context.js';
import Comment_Input  from './Comment_Input/comment_input.js';
import Comment_Container from './Comment_Container/comment_container.js';
import { io } from 'socket.io-client';
import './comments_container.less';

class Comments_Container extends Component {

    static contextType = Context

    Select_Comment = null //Should be replaced by the child, which should be an editor and this should be a lambda
    Unselect_Comment = null //Should be replaced by the child, which should be an editor and this should be a lambda

    Single_Comment_Container = Comment_Container //So that it can be replaced by the child

    lastScrollPosition = 0;

    //maxComments must be greater than limits_per_request else bug occurs
    maxComments = 100;

    //The limited number of comments per request
    limits_per_request = 25;

    //A flag that will temporary stop receiving anymore comments because we don't want to blow up the servver with 
    //hundreds of unnecessary request when there are no more comments left to retrieve
    stop_get_comments = false;

    //If the last comment id is the same one as the last scroll, that means no more comments available. So we pause 
    //getting anymore new comments for a short period of time
    last_comment_id = null;

    constructor(props){

        super(props);

        let {owner_user_account, visitor_user_account} = props;

        this.state = {
            owner_user_account,
            visitor_user_account,
            comments: [],
            show_current: this.Show_Original,
            previous_callbacks: [],
            selected_comments: {} //Should be replaced by the child, which should be an editor
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
        this.socket.on('reload_all_comments_from_child', this.Refresh_Current_Comments);
        this.socket.on('reload_all_comments_from_self', this.Refresh_Current_Comments);
    }

    Refresh_For_A_New_Comment = async () => {

        let {comments} = this.state;

        comments = (await this.Get_Comments(Date.now(), 1, "<=", "desc")).concat(comments);

        console.log(comments)

        this.setState({comments});

    }

    Refresh_Current_Comments = async () => {

        let time_stamp =  Date.now();

        this.setState({comments: await this.Get_Comments(time_stamp, this.maxComments, "<=", 'desc', true)});

    }

    //For now, scrolling up and down refresh the new set of comments. Number of comments only display limited amount at a time.
    Get_More_Comments = async (scrolldown = true) => {

        let {comments} = this.state;

        //If scrolling down, get the last time stamp, if scrolling up, get the first time stamp
        let {time_stamp} = comments.length ? (scrolldown ? comments[comments.length - 1] : comments[0]) : {time_stamp: Date.now()};

        let more_comments = scrolldown ? 
                                comments.concat(await this.Get_Comments(time_stamp, this.limits_per_request, "<", "desc")) : 
                                (await this.Get_Comments(time_stamp, this.limits_per_request, ">", "asc")).reverse().concat(comments);

        

        this.setState({comments: more_comments});
    }

    //When comments first arrived from server, it will be messy because it is 
    //comments, reactions and replies are all in a separate array. This will aggregate all of them together
    //into a single array
    Organize_Comments = (comments_obj)=>{

        if(!Object.keys(comments_obj).length){
            return [];
        }

        let {comments, emojis, replies} = comments_obj;

        let comments_dictionary = {};

        for(let i in comments){

            let {id} = comments[i];

            //Get the pointer of each comment and store it with a key
            comments_dictionary[id] = comments[i];

            comments_dictionary[id].reactions = [];
            comments_dictionary[id].replies = [];
        }

        for(let emo of emojis){

            let {target_id} = emo;

            comments_dictionary[target_id].reactions.push(emo);

        }

        for(let rep of replies){

            let {reply_to_id} = rep;

            comments_dictionary[reply_to_id].replies.push(rep);
        }

        return comments;

    }

    //if is_refresh flag is true, then don't do the stop_get_comments mechanic
    Get_Comments = async (offset_timestamp, limit = 10, greater_or_less = "<", asc_desc = "desc", is_refresh = false)=>{

        if(this.stop_get_comments && !is_refresh){
            return [];
        }

        this.stop_get_comments = true;

        //Give a delay between each getting comments because of user keep scrolling
        setTimeout(()=>{

            this.stop_get_comments = false;

        }, 1000)
        
        let {target_id, target_type, reply_to_id} = this.props;

        let {get_comments} = this.context.Request_URLs;

        let body = {
            target_id,
            target_type,
            offset_timestamp,
            greater_or_less,
            asc_desc,
            limit,
            reply_to_ids: reply_to_id ? `${reply_to_id}` :  ""
        };

        let data = await(await fetch(
            `${get_comments}`,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ))?.json();

        if(!data){
            return [];
        }

        let final_results = this.Organize_Comments(data?.results ?? {});

        let {id} = final_results.length ? final_results[final_results.length - 1] : {id: -1};

        //If we aren't getting anymore comments
        if(this.last_comment_id === id && !is_refresh){
            
            this.stop_get_comments = true;

            //Pause retrieving comments for 15 seconds
            setTimeout(()=>{

                this.stop_get_comments = false;
                this.last_comment_id = null;

            }, 15 * 1000);

            return [];
        }

        this.last_comment_id = !is_refresh ? id : null;

        return final_results;
    }

    Signal_To_Refresh_For_New_Comments = ()=>{

        let {target_id, target_type, reply_to_id} = this.props;

        let room_name = `${target_type}_${target_id}_${reply_to_id ?? 0}`;

        this.socket.emit('signal_reload_get_new_comment', {room_name});

        this.Signal_Refresh_Parent_Comments();

    }

    Signal_Refresh_This_Section_Comments = () => {

        let {target_id, target_type, reply_to_id} = this.props;

        let room_name = `${target_type}_${target_id}_${reply_to_id ?? 0}`;

        this.socket.emit('signal_reload_self_comments', {room_name});

    }

    Signal_Refresh_Parent_Comments = ()=>{

        let {parent_room_name} = this.props;

        if(!parent_room_name){
            return;
        }

        this.socket.emit('signal_reload_parent_comments', {parent_room_name});

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

            await this.setState({comments});
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

            if(percent < 0.25 && percent > 0.15){

                await this.Get_More_Comments(false);
                await this.Cut_Comments(false);

            }
            
            return;
        }



        if(percent > 0.75 && percent < 0.85){

            await this.Get_More_Comments(true);
            await this.Cut_Comments(true);
        }

    }

    Show_Original = ()=>{

        let {Single_Comment_Container, Show_Editor_Options} = this;

        let {comments, visitor_user_account, owner_user_account, selected_comments} = this.state;

        let {back_previous, show_replies, target_id, target_type, reply_to_id, comments_count} = this.props;

        //Make sure the children uses the first comment_container.js back_revious and show_replies
        back_previous = back_previous || this.Back_Previous;
        show_replies = show_replies || this.Show_Replies;

        let amount = comments.length;

        return (<div id="comments-container">

            {Show_Editor_Options && Show_Editor_Options()}

            <div id="comment-header">

                <label>{ amount } {reply_to_id ? (amount > 1 ? "Replies" : "Reply") : (amount > 1 ? "Comments" : "Comment")}</label>

            </div>

            <div id="comment-values-wrapper" onScroll={this.Scroll_For_More}>

                {comments.map((value, index)=>{

                    return <div className="single-comment-entry" key={value.id}>

                            <Single_Comment_Container 
                                comment_info={value}
                                owner_user_account={owner_user_account} 
                                visitor_user_account={visitor_user_account}
                                back_previous={back_previous} 
                                show_replies={show_replies}
                                target_id={target_id}
                                target_type={target_type}
                                reply_to_id={reply_to_id}
                                signal_refresh_this_section_comments={this.Signal_Refresh_This_Section_Comments}
                                signal_refresh_parent_comments={this.Signal_Refresh_Parent_Comments}
                                select_comment={this.Select_Comment}   
                                unselect_comment={this.Unselect_Comment}
                                selected={selected_comments && selected_comments[value.id] ? true : false}
                            />

                        </div>;

                })}
                
            </div>

            <div id="comment-input-wrapper">

                <Comment_Input 
                    key={reply_to_id ?? 0}
                    owner_user_account={owner_user_account}
                    visitor_user_account={visitor_user_account}
                    Signal_To_Refresh_For_New_Comments={this.Signal_To_Refresh_For_New_Comments}
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
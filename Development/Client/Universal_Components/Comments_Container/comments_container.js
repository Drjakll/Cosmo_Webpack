import React, {Component} from 'react';
import Context from '@context/context.js';
import Comment_Input  from './Comment_Input/comment_input.js';
import Comment_Container from './Comment_Container/comment_container.js';
import { io } from 'socket.io-client';
import './comments_container.less';

class Comments_Container extends Component {

    static contextType = Context

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

    async componentDidMount(){

        this.Connect_IO();

        this.setState({
            comments: await this.Get_Comments(Date.now())
        });

    }

    componentDidUpdate(prevProps, prevState){

        if(this.props !== prevProps){

            this.setState(this.props);

        }
    }

    Connect_IO = ()=>{

        this.socket = io('/comment_room');

        this.socket.on('connect', ()=>{

            let {target_id, target_type} = this.props;

            let room_name = `${target_type}_${target_id}`;

            this.socket.emit('join_comment_room', {room_name});

        });

        this.socket.on('reload_comments', async ()=>{

            let {comments} = this.state;

            let top_comment = comments.length > 0 ? comments[comments.length - 1] : {time_stamp: Date.now()};

            let {time_stamp} = top_comment;

            this.setState({comments: await this.Get_Comments(time_stamp)});
        });
    }

    Get_Comments = async (offset_timestamp)=>{

        let {target_id, target_type, reply_to_id} = this.props;

        let {get_comments} = this.context.Request_URLs;

        let body ={
            target_id,
            target_type,
            reply_to_id,
            offset_timestamp
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

        let {target_id, target_type} = this.props;

        let room_name = `${target_type}_${target_id}`;

        this.socket.emit('signal_all_reload_comment', {room_name});
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

    Show_Original = ()=>{

        let {comments, visitor_user_account, owner_user_account} = this.state;

        let {back_previous, show_replies, target_id, target_type, reply_to_id} = this.props;

        back_previous = back_previous || this.Back_Previous;
        show_replies = show_replies || this.Show_Replies;

        return (<div id="comments-container">

            <div id="comment-header">

                <label>Comments</label>

            </div>

            <div id="comment-values-wrapper">

                {comments.map((value, index)=>{

                    return <div className="single-comment-entry" key={index}>

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
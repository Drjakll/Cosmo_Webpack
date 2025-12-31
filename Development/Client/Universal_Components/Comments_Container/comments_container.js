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
            comments: this.Get_Comments(Date.now())
        };
    }

    componentDidMount(){

        this.Connect_IO();

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

        this.socket.on('reload_comments', ()=>{

            let {comments} = this.state;

            let top_comment = comments.length > 0 ? comments[0] : {time_stamp: Date.now()};

            let {time_stamp} = top_comment;

            this.setState({comments: this.Get_Comments(time_stamp)});
        });
    }

    Get_Comments = async (offset_timestamp)=>{

        let {target_id, target_type} = this.props;

        let {get_comments} = this.context.Request_URLs;

        let body ={
            target_id,
            target_type,
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

    render(){

        let {comments, visitor_user_account, owner_user_account} = this.state;

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
                                visitor_user_account={visitor_user_account} />

                        </div>;

                })}
                
            </div>

            <div id="comment-input-wrapper">

                <Comment_Input 
                    owner_user_account={owner_user_account}
                    visitor_user_account={visitor_user_account}
                />

            </div>

        </div>);
    }
}

export default Comments_Container;
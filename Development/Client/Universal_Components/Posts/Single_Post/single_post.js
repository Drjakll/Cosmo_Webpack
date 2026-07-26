import React, { Component, createRef } from 'react';
import Post_Photo_Viewer from './Post_Photo_Viewer/post_photo_viewer.js';
import Comments_Container from '@comments_container';
import General_Reactions_Container from '@general_reactions_container';
import init_websocket from '@init_websocket';
import Request_URLs from '@request_urls';
import './single_post.less';

class Single_Post extends Component {

    Comments_Holder = Comments_Container
    
    Months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    //Needed for to set innerHTML for post body
    bodyRef = createRef();

    constructor(props) {

        super(props);
        
        let { post, owner_user_account, visitor_user_account, for_commenting } = this.props;


        this.state = {
            owner_user_account,
            visitor_user_account,
            post,
            for_commenting
        };
    }

    componentDidMount() {

        this.bodyRef.current.innerHTML = this.state.post?.body;

        this.Init_Socket();

    }

    componentWillUnmount() {

        this.socket?.disconnect();
        
    }

    Init_Socket = async  ()=>{

        if(this.socket !== undefined){
            await this.socket.disconnect();
        }

        this.socket = init_websocket('/reaction_room', this.Init_Socket);

        this.socket?.on('connect', ()=>{

            let {id} = this.state.post;

            let room_name = `post_${id}`;

            this.socket?.emit('join_reaction_room', {room_name});

        });

        this.socket?.on('refresh_reactions', this.Refresh_Reactions);        

    }

    Signal_All_Refresh_Reactions = ()=>{

        let {id} = this.state.post;

        this.socket?.emit('signal_all_refresh_reactions', {room_name: `post_${id}`});
    }

    Refresh_Reactions = async ()=>{

        let {get_posts} = Request_URLs;

        let {id: user_id} = this.state.owner_user_account;

        let {id} = this.state.post;

        let data = await( await fetch(
            get_posts,
            {
                method: "POST",
                body: JSON.stringify({id, user_id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        let {targets: posts, reactions} = data?.results ?? {targets: [], reactions: []};

        let post = posts.length ? posts[0] : {};

        post.reactions = reactions;

        this.setState({post});

    }
    
    async componentDidUpdate(prevProps, prevState){

        let {post, for_commenting} = this.props;
        
        if(post?.id === prevProps.post?.id){
            return;
        }

        await this.setState({post, for_commenting});

        if(this.bodyRef.current){

            this.bodyRef.current.innerHTML = post?.body;
        }

        this.Init_Socket();

    }
    
    Generate_Beautiful_Date = (date_ms)=>{
        
        return new Date(date_ms).toLocaleDateString();
        
    }

    Open_Comments_Container = (e)=>{

        if(this.state.for_commenting){
            return;
        }
        
        this.props.change_main_display(this.Render_Comments_Container);

    }

    Render_Comments_Container = () => {

        let {post, visitor_user_account, owner_user_account} = this.state;

        let {Comments_Holder} = this;


        return <div id="comments-container-wrapper">

            <div id="post-comments-post-section">

                <Single_Post
                    post={post}
                    visitor_user_account={visitor_user_account}
                    owner_user_account={owner_user_account}
                    for_commenting={true}
                />

            </div>

            <div id="post-comments-section">

                <Comments_Holder
                    reply_to_id={null}
                    target_id={post.id}
                    target_id_type={"post_id"}
                    visitor_user_account={visitor_user_account}
                    owner_user_account={owner_user_account}
                    parent_room_name={null}
                />

            </div>

        </div>;
    }

    render() {
        
        let {post, visitor_user_account, owner_user_account} = this.state;
        let {title, created_on, comments_count, id} = post;

        return <div id="single-post">
        
            <div id="title">
        
                <label>{title}</label>
        
            </div>
            
            <div id="body">

                <div id="post-photo-viewer">

                    <Post_Photo_Viewer post={post} />

                </div>

                <pre ref={this.bodyRef}>
                    
                </pre>

            </div>
            
            <div id="bottom-body">

                <div id="user-judgements-wrapper">

                    <div id="reactions-wrapper" className="bottom-body-section">

                        <General_Reactions_Container 
                            visitor_user_account={visitor_user_account}
                            owner_user_account={owner_user_account}
                            target_id={id}
                            target_id_type={"post_id"}
                            refresh_parent={this.Signal_All_Refresh_Reactions}
                            reactions={post.reactions}
                        />

                    </div>

                    <div id="comments-count-wrapper" className="bottom-body-section">

                        <div id="open-to-comment-button" onClick={this.Open_Comments_Container}>

                            Comments({comments_count})
                            
                        </div>

                    </div>

                </div>

                <div id="time-created" className="bottom-body-section">
                    
                    {this.Generate_Beautiful_Date(created_on)}
                    
                </div>

            </div>

        </div>;
    }
}

export default Single_Post;
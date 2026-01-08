import React, { Component, createRef } from 'react';
import Comments_Container from '@comments_container/comments_container.js';
import Context from '@context/context.js';
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
    ]

    //Needed for to set innerHTML for post body
    bodyRef = createRef();

    constructor(props) {

        super(props);
        
        let { post, owner_user_account, visitor_user_account, for_commenting } = this.props;

        Single_Post.contextType = Context;

        this.state = {
            owner_user_account,
            visitor_user_account,
            post: post,
            for_commenting
        };
    }

    componentDidMount() {

        this.bodyRef.current.innerHTML = this.state.post?.body;

    }
    
    async componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        await this.setState(this.props);

        this.bodyRef.current?.innerHTML = this.state.post?.body;

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
                    target_type={"post"}
                    visitor_user_account={visitor_user_account}
                    owner_user_account={owner_user_account}
                    parent_room_name={null}
                />

            </div>

        </div>;
    }

    render() {
        
        let {post, visitor_user_account, owner_user_account} = this.state;
        let {title, created_on, comments_count} = post;

        let {editable} = this.props;

        return <div id="single-post">
        
            <div id="title">
        
                <label>{title}</label>
        
            </div>
            
            <div id="body">

                <pre ref={this.bodyRef}>
                    
                </pre>

            </div>
            
            <div id="bottom-body">

                <div id="comments-count-wrapper" className="bottom-body-section">

                    <div id="open-to-comment-button" onClick={this.Open_Comments_Container}>

                        Comments({comments_count})
                        
                    </div>

                </div>

                <div id="time-created" className="bottom-body-section">
                    
                    {this.Generate_Beautiful_Date(created_on)}
                    
                </div>

                <div className="bottom-body-section">

                </div>

            </div>

        </div>;
    }
}

export default Single_Post;
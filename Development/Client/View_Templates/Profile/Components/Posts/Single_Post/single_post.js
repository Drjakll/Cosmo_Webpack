import React, { Component, createRef } from 'react';
import Comments_Container from './Comments_Container/comments_container.js';
import './single_post.less';

class Single_Post extends Component {
    
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
        
        let { post, owner_user_account, visitor_user_account } = this.props;

        Single_Post.contextType = window.Context;

        this.state = {
            owner_user_account,
            visitor_user_account,
            post: post,
            open_comments_container: false
        };
    }

    componentDidMount() {

        this.bodyRef.current.innerHTML = this.state.post.body;

    }
    
    async componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        await this.setState(this.props);

        this.bodyRef.current?.innerHTML = this.state.post?.body;

    }
    
    Generate_Beautiful_Date = (date_str)=>{
        
        if(!date_str)
            return "";
        
        let parts = date_str.split("T")[0];
        let date_parts = parts?.split("-");

        if (!date_parts) {
            return;
        }
        
        let year = parseInt(date_parts[0]);
        let month = parseInt(date_parts[1]);
        let date = parseInt(date_parts[2]);
        
        return `${this.Months[month-1]} ${date}, ${year}`;
        
    }

    Open_Comments_Container = (e)=>{
        
        this.setState({open_comments_container: true});

    }

    Close_Comments_Container = (e)=>{

        this.setState({open_comments_container: false});

    }

    render() {
        
        let {post, open_comments_container, visitor_user_account, owner_user_account} = this.state;
        let {title, date_created} = post;

        return <div id="single-post">

            {open_comments_container ? 

            <div id="comments-container-wrapper">

                <div id="comments-container-exit-button" onClick={this.Close_Comments_Container}>
                
                </div>

                <Comments_Container 
                    post={post} 
                    generate_beautiful_date={this.Generate_Beautiful_Date} 
                    visitor_user_account={visitor_user_account}
                    owner_user_account={owner_user_account}
                    /> 

            </div> : null}
        
            <div id="title">
        
                {title}
        
            </div>
            
            <div id="body">

                <pre ref={this.bodyRef}>
                    
                </pre>

            </div>
            
            <div id="bottom-body">

                <div id="comments-count-wrapper" className="bottom-body-section">

                    <div id="open-to-comment-button" onClick={this.Open_Comments_Container}>

                        Comments 
                        
                    </div>

                </div>

                <div id="time-created" className="bottom-body-section">
                    
                    {this.Generate_Beautiful_Date(date_created)}
                    
                </div>

                <div className="bottom-body-section">

                </div>

            </div>

        </div>;
    }
}

export default Single_Post;
import React, { Component, createRef } from 'react';
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

    bodyRef = createRef();

    constructor(props) {

        super(props);
        
        let { post } = this.props;

        Single_Post.contextType = window.Context;

        this.state = {
            post: post,
            post_photos: []
        };
    }

    componentDidMount() {

        this.bodyRef.current.innerHTML = this.state.post.body;

        this.Get_Post_Photos();
    }
    
    async componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        await this.setState(this.props);

        this.bodyRef.current?.innerHTML = this.state.post?.body;

        this.Get_Post_Photos();
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

    Get_Post_Photos = async () => {

        let { post } = this.state;

        if (!post || !post.id) {
            return;
        }

        let { get_post_photo_links } = this.context.Request_URLs;

        let res = await (await fetch(get_post_photo_links, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })).json();

        if (res && res.photos.length > 0) {

            this.setState({
                post_photos: res.photos
            })
        }
    }

    render() {
        
        let {post} = this.state;
        let {title, date_created} = post;

        return <div id="single-post">
        
            <div id="title">
        
                {title}
        
            </div>
            
            <div id="body">

                <pre ref={this.bodyRef}>
                </pre>
        
            </div>
            
            <div id="time-created">
                
                {this.Generate_Beautiful_Date(date_created)}
                
            </div>

        </div>;
    }
}

export default Single_Post;
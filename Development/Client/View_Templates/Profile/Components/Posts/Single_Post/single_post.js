import React, { Component } from 'react';
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

    constructor(props) {

        super(props);
        
        let {post} = this.props;

        this.state = {
            post: post
        };
    }
    
    componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        this.setState(this.props);
    }
    
    Generate_Beautiful_Date = (date_str)=>{
        
        if(!date_str)
            return "";
        
        let parts = date_str.split("T")[0];
        let date_parts = parts?.split("-");
        
        let year = parseInt(date_parts[0]);
        let month = parseInt(date_parts[1]);
        let date = parseInt(date_parts[2]);
        
        return `${this.Months[month-1]} ${date}, ${year}`;
        
    }

    render() {
        
        let {post} = this.state;
        let {title, body, date_created} = post;

        return <div id="single-post">
        
            <div id="title">
        
                {title}
        
            </div>
            
            <div id="body">
        
                {body}
        
            </div>
            
            <div id="time-created">
                
                {this.Generate_Beautiful_Date(date_created)}
                
            </div>

        </div>;
    }
}

export default Single_Post;
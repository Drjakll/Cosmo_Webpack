import React, { Component } from 'react';
import './posts.less';

class Posts extends Component {
    
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
    
    constructor(props){
        
        super(props);

        Posts.contextType = window.Context;
        
        this.Posts_JSON = {};
        
        let today = new Date();

        let {owner_user_account, visitor_user_account, connection_list, post_editor, change_display} = props;

        this.state = {
            selected_year: today.getFullYear(),
            selected_month: today.getMonth() + 1,
            selected_date: today.getDate(),
            selected_post: {title: "No post selected", body: "", date_created: Date.now()},
            properties_for_calendar_dates: [],
            connection_list: connection_list || {}, //For sending out websocket events to particular connected user
            owner_user_account,
            visitor_user_account,
            post_editor,
            change_display
        };
    }

    componentDidMount(){

        this.Setup_Calendar();

    }
    
    async componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        await this.setState(this.props);

        this.Setup_Calendar();
        
    }

    Setup_Calendar = () => {

        let {owner_user_account} = this.props;
        
        if (owner_user_account) {
            
            let { last_posted } = owner_user_account;

            let last_posted_local = new Date(last_posted || Date.now() );
            
            if(last_posted_local){
                
                let year = last_posted_local.getFullYear();
                let month = last_posted_local.getMonth() + 1;
                
                this.Change_Month({year: year, month: month});
                
            }
        }
    }
    
    Change_Month = ({year, month}) => {
        
        let { email } = this.state.owner_user_account || {};

        let last_day_of_month = new Date(year, month, 0).getDate();

        this.Get_Posts_On_This_Month(month, last_day_of_month, year, email);
    }
    
    Get_Posts_On_This_Month = async (month, last_day_of_month, year, email)=>{
        
        let {Request_URLs} = this.context;
        
        let {get_posts} = Request_URLs;

        let start = new Date(`${year}-${month}-1`).getTime();
        let end = new Date(`${year}-${month}-${last_day_of_month}`).getTime();
        
        let search_requirements = {
            owner_email: email,
            date_interval: {
                start,
                end
            },
            order: 'asc'
        };
        
        let res = await fetch(get_posts, {
                method: "POST",
                body: JSON.stringify(search_requirements),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
        let resJson = await res.json();
        
        if (resJson) {

            let calendar_posts = this.Organize_Posts_For_Calendar(resJson.posts);
            
            this.setState({
                properties_for_calendar_dates: calendar_posts,
                selected_year: year,
                selected_date: last_day_of_month,
                selected_month: month
            });

            if (calendar_posts.length === 0) {
                return;
            }

            this.Set_Current_Post(calendar_posts[calendar_posts.length - 1].date);
        }
        
    }
    
    Organize_Posts_For_Calendar = (posts) => {
        
        if(!posts){
            return [];
        }
        
        let result = [];
        
        this.Posts_JSON = {};
        
        
        for(let post of posts){

            let date_created = new Date(post.date_created);
            
            
            let date = date_created.getDate();
            
            let style = {
                backgroundColor: "darkorange",
                boxShadow: "rgba(0,0,0,0.35) 0px 0px 5px"
            };
            
            let popup = <div style={{
                backgroundColor: "rgba(0,0,0,0.75)",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "rgba(255,255,255,0.9)",
                borderRadius: "15px",
                minWidth: "50px",
                maxHeight: "25px",
                whiteSpace: "pre",
                fontSize: "13px",
                boxShadow: "rgba(0,0,0,0.25) 2.5px 2.5px 5px"
            }}>{post.title}</div>;
            
            result.push({
               date: date,
               style: style,
               popup: popup,
               callback: this.Set_Current_Post
            });
            
            this.Posts_JSON[date] = post;
        }
        
        return result;
    }
    
    Set_Current_Post = (date) => {
        
        this.setState({
            selected_post: this.Posts_JSON[date],
            selected_date: date
        });
        
    }

    render() {

        const { Calendar, Single_Post } = this.context;
        
        let { selected_year, selected_month, selected_date, selected_post, visitor_user_account, owner_user_account, change_display } = this.state;

        const Post_Editor = this.state.post_editor;

        
        return (
            <div id="posts" tabIndex="0">
                
                <div id="post-label">
                    <u>Posts</u>
                </div>

                <div id="top">

                    <div id="calendar-wrapper">

                        <div id="date-display-clickable">
                            {`${this.Months[selected_month - 1]} ${selected_date}, ${selected_year}`}
                        </div>

                        <div id="calendar-popup">

                            <Calendar 
                                year={selected_year}
                                month={selected_month}
                                date={selected_date}
                                callback_left={this.Change_Month}
                                callback_right={this.Change_Month}
                                date_properties={this.state.properties_for_calendar_dates}
                            />

                        </div>

                    </div>

                </div>

                <div id="bottom">

                    <Single_Post post={selected_post || {}} 
                                visitor_user_account={visitor_user_account} 
                                owner_user_account={owner_user_account} 
                                change_main_display={change_display}
                    />

                </div>

            </div>
        );
    }
}

export default Posts;
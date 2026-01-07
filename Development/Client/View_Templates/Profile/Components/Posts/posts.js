import React, { Component } from 'react';
import Context from '@context/context.js';
import Single_Post from '@universal_components/Posts/Single_Post/single_post.js';
import './posts.less';

class Posts extends Component {

    Single_Post = Single_Post;
    
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

        Posts.contextType = Context;
        
        this.Posts_JSON = {};
        
        let today = new Date();

        let {owner_user_account, visitor_user_account, connection_list, change_display} = props;

        this.state = {
            selected_year: today.getFullYear(),
            selected_month: today.getMonth() + 1,
            selected_date: today.getDate(),
            selected_post: {title: "No post selected", body: "", date_created: Date.now()},
            properties_for_calendar_dates: [],
            connection_list: connection_list || {}, //For sending out websocket events to particular connected user
            owner_user_account,
            visitor_user_account,
            change_display,
            last_time_posted: Date.now() //This is the last time user made a post. Data is in milliseconds
        };

    }

    async componentDidMount(){

        this.Setup_Calendar();

    }
    
    async componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }
        
        //this.setState(this.props);
        
    }

    Get_User_Last_Posted = async ()=>{

        let { get_last_time_posted } = this.context.Request_URLs;

        let {id: user_id} = this.state.owner_user_account;

        let body = {
            user_id
        };

        let data = await(await fetch(
            get_last_time_posted,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        return data?.last_time_posted;
    }

    Setup_Calendar = async () => {

        let last_time_posted = await this.Get_User_Last_Posted();
            
        let last_posted_local = new Date(last_time_posted || Date.now() );
        
        if(last_posted_local){
            
            let year = last_posted_local.getFullYear();
            let month = last_posted_local.getMonth() + 1;
            
            this.Change_Month({year, month});
            
        }
    }
    
    Change_Month = ({year, month}) => {
        
        let { id } = this.state.owner_user_account || {};

        let last_day_of_month = new Date(year, month, 0).getDate();

        this.Get_Posts_On_This_Month(month, last_day_of_month, year, id);
    }
    
    Get_Posts_On_This_Month = async (month, last_day_of_month, year, id)=>{
        
        let {Request_URLs} = this.context;
        
        let {get_posts} = Request_URLs;

        let start = new Date(`${year}-${month}-1`).getTime();
        let end = new Date(`${year}-${month}-${last_day_of_month}`).getTime();
        
        let search_requirements = {
            user_id: id,
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

            let date_created = new Date(post.created_on);
            
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

        const { Calendar } = this.context;

        const { Single_Post: Post} = this;
        
        let { selected_year, selected_month, selected_date, selected_post, visitor_user_account, owner_user_account, change_display } = this.state;
        
        return (
            <div id="posts" tabIndex="0">
                
                <div id="post-label">
                    Posts
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

                    <Post post={selected_post || {}} 
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
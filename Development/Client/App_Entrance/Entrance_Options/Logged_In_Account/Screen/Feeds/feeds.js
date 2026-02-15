import React, {Component} from 'react';
import Context from '@context/context.js';
import Post_Feed from './Feed_Types/Post_Feed/post_feed.js';
import Album_Feed from './Feed_Types/Album_Feed/album_feed.js';
import Profile_Thumbnail from '@universal_components/Profile_Thumbnail/profile_thumbnail.js';
import './feeds.less';

class Feeds extends Component {

    static contextType = Context;

    Last_Render_Callback = [];
    
    constructor(props){
        
        super(props);

        let {owner_user_account} = props;

        this.state = {
            owner_user_account,
            feeds: [],
            feed_types: {},
            following: [],
            render_callback: this.Render_Main_Display
        };
    }

    async componentDidMount(){

        await this.Get_Followings();

        await this.Get_Feeds(Date.now());

        this.Get_Mutual_Recommendations();
    }

    async componentDidUpdate(prevProps, prevState){

        if(prevProps === this.props){
            return;
        }
        
        this.setState(this.props);

    }

    Get_Followings = async ()=>{

        let {get_all_followings} = this.context.Request_URLs;

        let {owner_user_account} = this.state;

        let body = {
            id: owner_user_account.id
        };

        let data = await(await fetch(
            get_all_followings,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )).json();

        if(!data){
            return;
        }

        this.state.following = data.results;

        await this.setState({following: data.results});
    }

    Get_Feeds = async (offset)=>{

        let {get_feeds} = this.context.Request_URLs;

        let {following} = this.state;

        let ids = [];

        for(let follow of following){

            ids.push(follow.id);
            
        }

        let data = await(await fetch(
            `${get_feeds}/?user_ids=${ids.join(',')}&offset=${offset}`,
            {
                method: "GET"
            }
        )).json();

        if(!data){
            return;
        }

        await this.setState({feeds: data.results});

    }

    Get_Mutual_Recommendations = async ()=>{

        let {get_mutual_recommendations} = this.context.Request_URLs;

        let {id} = this.state.owner_user_account;

        let data = await(await fetch(
            `${get_mutual_recommendations}/${id}`,
            {
                method: "GET"
            }
        )).json();

        if(!data){
            return;
        }

        console.log(data.results);
    }

    Render_Main_Display = () => {

        let {feeds, owner_user_account} = this.state;

        return <div id="feeds">

            <div id="feeds-updates-headline">

                Feeds

            </div>

            <div id="feeds-updates">

                {feeds?.map((data, index)=>{

                    let {target_type, target_id, created_on, user_id, gender, first_name, last_name, profile_picture_link} = data;

                    let from_account = {first_name, last_name, gender, profile_picture_link, id: user_id};

                    return (<div className="feeds-update-section" key={`${target_type}${target_id}`}>

                        <div id="feed-account-information">

                            <div id="profile-thumbnail">

                                <Profile_Thumbnail
                                    profile={from_account}
                                    owner_user_account={owner_user_account}
                                    visitor_user_account={owner_user_account}
                                    rounded_portrait={0}
                                />

                            </div>

                            <label>{first_name} {last_name}</label>

                            <div id="time-created">{new Date(created_on).toLocaleString()}</div>

                        </div>

                        <div id="feed-update-information">

                            {this.Feed_Types[target_type]({feed_id: target_id, from_account})}

                        </div>

                    </div>);

                })}

            </div>
            
        </div>;

    }

    Change_Display = (render_callback) => {

        this.Last_Render_Callback.push(this.state.render_callback);
        
        this.setState({render_callback});
    }

    Render_With_Go_Back_Button = () => {

        let {render_callback} = this.state;

        let Go_Back = (e) => {

            if(this.Last_Render_Callback.length === 0){
                return;
            }

            let last_callback = this.Last_Render_Callback.pop();

            this.setState({render_callback: last_callback});

        }   

        return <div id="contents">

            <div id="go-back-button" onClick={Go_Back}>

                Back

            </div>

            <div id="content-container">

                {render_callback()}

            </div>

        </div>;

    }

    Feed_Types = {
        "post": ({feed_id, from_account})=>{

            let {owner_user_account} = this.state;

            return <Post_Feed 
                visitor_user_account={owner_user_account}
                feed_id={feed_id}
                change_display={this.Change_Display}
                from_account={from_account}
            />;
        },
        "album_updates": ({feed_id, from_account})=>{
            
            let {owner_user_account} = this.state;

            return <Album_Feed 
                visitor_user_account={owner_user_account}
                feed_id={feed_id}
                change_display={this.Change_Display}
                from_account={from_account}
            />;
        }
    }
    
    render(){

        let {render_callback} = this.state;
        
        return (
            <div id="display-wrapper">

                {render_callback === this.Render_Main_Display ? render_callback() : this.Render_With_Go_Back_Button()}

            </div>
        );
    }
}

export default Feeds;
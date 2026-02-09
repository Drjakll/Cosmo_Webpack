import React, {Component} from 'react';
import Context from '@context/context.js';
import Post_Feed from './Feed_Types/Post_Feed/post_feed.js';
import Album_Feed from './Feed_Types/Album_Feed/album_feed.js';
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

    Render_Main_Display = () => {

        let {feeds} = this.state;

        return <div id="feeds">

            <div id="feeds-updates">

                {feeds?.map((data, index)=>{

                    let {target_type, target_id} = data;

                    return (<div className="feeds-update-section" key={`${target_type}${target_id}`}>

                        {this.Feed_Types[target_type]({feed_id: target_id})}

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

            {render_callback()}

        </div>;

    }

    Feed_Types = {
        "post": ({feed_id})=>{

            let {owner_user_account} = this.state;

            return <Post_Feed 
                owner_user_account={owner_user_account} 
                feed_id={feed_id}
                change_display={this.Change_Display}
            />;
        },
        "album_updates": ({feed_id})=>{
            
            let {owner_user_account} = this.state;

            return <Album_Feed 
                owner_user_account={owner_user_account} 
                feed_id={feed_id}
                change_display={this.Change_Display}
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
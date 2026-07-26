import React, {Component} from 'react';
import Request_URLs from '@request_urls';
import Single_Post from '@single_post';
import './post_feed.less';

class Post_News extends Component {

    constructor(props){

        super(props);

        let {visitor_user_account, from_account, feed_id} = props;

        this.state = {
            from_account,
            visitor_user_account,
            feed_id,
            post: null
        };
    }

    componentDidMount(){

        this.Get_Post();
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    Get_Post = async ()=>{

        let {feed_id, from_account} = this.state;

        let {get_posts} = Request_URLs;

        let body = {
            id: feed_id,
            user_id: from_account.id
        };

        let data = await(await fetch(
            get_posts,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        if(!data){
            return;
        }

        this.setState({
            post: await this.Aggregate_Post_with_Reactions(data.results)[0]
        });

    }

    Aggregate_Post_with_Reactions = (data)=>{

        let {reactions, targets} = data;

        let dictionary = {};

        for(let i in targets){

            let {id} = targets[i];

            //Map the pointer of each post to a key
            dictionary[id] = targets[i];

            dictionary[id].reactions = [];
        }

        for(let reaction of reactions){

            let {post_id} = reaction;

            //Push in each reaction to each object by mapping to the key
            dictionary[post_id].reactions.push(reaction);

        }

        return targets;

    }

    render(){

        let {change_display, header} = this.props;

        let {visitor_user_account, from_account, post} = this.state;

        return (
            <div id="post-feed" className="general-feed">

                {header}

                <div id="the-post-contents">

                    <Single_Post 
                        visitor_user_account={visitor_user_account} 
                        owner_user_account={from_account} 
                        post={post ?? {}} 
                        change_main_display={change_display}
                    />

                </div>

            </div>
        )
    }
}

export default Post_News;
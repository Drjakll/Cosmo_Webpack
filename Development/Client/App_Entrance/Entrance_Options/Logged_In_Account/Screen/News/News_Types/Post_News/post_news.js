import React, {Component} from 'react';
import Context from '@context/context.js';
import './post_news.less';

class Post_News extends Component {

    static contextType = Context;

    constructor(props){

        super(props);

        let {visitor_user_account, owner_user_account, post} = props;

        this.state = {
            owner_user_account,
            visitor_user_account,
            post
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState(this.props);
    }

    render(){

        let {Single_Post} = this.context;

        let {visitor_user_account, owner_user_account, post} = this.state;

        return (
            <div id="post-news">

                <div id="the-post-contents">

                    <Single_Post 
                        visitor_user_account={visitor_user_account} 
                        owner_user_account={owner_user_account} 
                        post={post} 
                        change_main_display={this.props.change_display}
                    />

                </div>

            </div>
        )
    }
}

export default Post_News;
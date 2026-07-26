import React, { Component } from 'react';
import The_Texts from './The_Texts/the_texts.js';
import The_Photos from './The_Photos/the_photos.js';
import Popup_Msg from '@popup_message';
import Request_URLs from '@request_urls';
import './the_editor.less';

class The_Editor extends Component {

    constructor(props) {

        super(props);


        let { selected_post, owner_user_account } = props;

        this.state = {
            selected_post,
            post_photos: [],
            selected_photos: {},
            owner_user_account
        };
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps === this.props) {
            return;
        }

        this.setState(this.props);
    }

    Save_Post = async (post) => {

        let { update_post } = Request_URLs;

        let res = await (await fetch(update_post, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })).json();

        Popup_Msg("message", res?.message, null);

        let {refresh_posts} = this.props;

        refresh_posts();
    }

    Create_Post = async (post) => {

        if(this.state.selected_post){
            alert("A post already created for today!");
            return;
        }

        let { create_post } = Request_URLs;

        let res = await (await fetch(create_post, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })).json();

        Popup_Msg("message", res?.message, null);

        this.setState({selected_post: res?.result});

        let {refresh_posts} = this.props;

        refresh_posts();

    }

    Set_Post_Photos = (photos) => {

        this.setState({ post_photos: photos });
    }

    Set_Selected_Photos = (selected_photos) => {

        this.setState({ selected_photos: selected_photos });

    }

    render() {

        let {return_previous_display, refresh_posts} = this.props;
        let {owner_user_account, selected_post, post_photos, selected_photos} = this.state;

        return <div id="the-opened-post-editor-wrapper">
            
            <div id="the-texts-outer-wrapper" className="the-outer-wrapper">

                <The_Texts post={selected_post}
                    owner_user_account={owner_user_account}
                    update={selected_post ? this.Save_Post : this.Create_Post}
                    refresh_posts={refresh_posts}
                    post_photos={post_photos}
                    selected_photos={selected_photos}
                    return_previous_display={return_previous_display}
                />

            </div>

            <div id="the-photos-outer-wrapper" className="the-outer-wrapper">

                <The_Photos
                    post_info={selected_post}
                    owner_user_account={owner_user_account}
                    Set_Post_Photos={this.Set_Post_Photos}
                    Set_Selected_Photos={this.Set_Selected_Photos}
                />

            </div>

        </div>;
    }
}

export default The_Editor;
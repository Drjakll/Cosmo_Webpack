import React, { Component } from 'react';
import The_Texts from './The_Texts/the_texts.js';
import The_Photos from './The_Photos/the_photos.js';
import './the_editor.less';

class The_Editor extends Component {

    constructor(props) {

        super(props);

        The_Editor.contextType = window.Context;

        let { selected_post, owner_user_account, connection_list } = props;

        this.state = {
            selected_post: selected_post,
            post_photos: [],
            selected_photos: {},
            owner_user_account,
            connection_list
        };
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps === this.props) {
            return;
        }

        this.setState(this.props);
    }

    Save_Post = async (post) => {

        let { update_post } = this.context.Request_URLs;

        let res = await (await fetch(update_post, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })).json();

        await this.props.Get_Posts();

        global_connection_socket?.emit("refresh_group_alerts", {request_to_emails: this.state.connection_list});

    }

    Create_Post = async (post) => {

        let { create_post } = this.context.Request_URLs;

        let res = await (await fetch(create_post, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })).json();

        await this.props.Get_Posts();

        global_connection_socket?.emit("refresh_group_alerts", {request_to_emails: this.state.connection_list});
    }

    Set_Post_Photos = (photos) => {

        this.setState({ post_photos: photos });
    }

    Set_Selected_Photos = (selected_photos) => {

        this.setState({ selected_photos: selected_photos });

    }

    render() {

        return <div id="the-opened-post-editor-wrapper">
            
            <div id="the-texts-outer-wrapper" className="the-outer-wrapper">

                <The_Texts post={this.state.selected_post}
                    owner_user_account={this.state.owner_user_account}
                    update={this.state.selected_post ? this.Save_Post : this.Create_Post}
                    Get_Posts={this.props.Get_Posts}
                    post_photos={this.state.post_photos}
                    selected_photos={this.state.selected_photos}
                    connection_list={this.state.connection_list}
                />

            </div>

            <div id="the-photos-outer-wrapper" className="the-outer-wrapper">

                <The_Photos
                    post_info={this.state.selected_post}
                    owner_user_account={this.state.owner_user_account}
                    Set_Post_Photos={this.Set_Post_Photos}
                    Set_Selected_Photos={this.Set_Selected_Photos}
                />

            </div>

        </div>;
    }
}

export default The_Editor;
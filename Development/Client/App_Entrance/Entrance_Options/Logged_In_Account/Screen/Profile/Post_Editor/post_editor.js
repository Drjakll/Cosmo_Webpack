import React, { Component } from 'react';
import The_Editor from './The_Editor/the_editor.js';
import './post_editor.less';

class Post_Editor extends Component {

    constructor(props) {

        super(props);

        this.existing_post = null; // This will hold the post that is being edited, if any

        Post_Editor.contextType = window.Context;

        this.state = {
            editor_opened: false,
            selected_post: null,
            account_info: props.account_info,
            disable_create_new_post: false,
            connection_list: props.connection_list
        };
    }

    async componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }

        this.existing_post = this.props.selected_post;

        await this.setState(this.props);

        this.Disable_Create_New_Post();
    }

    componentDidMount() {

        this.Disable_Create_New_Post();
    }

    Disable_Create_New_Post = async () => {

        let { account_info } = this.state;

        if(!account_info){
            return;
        }

        let { Configurations } = this.context;

        let { UTC_Time_Now } = Configurations;

        let utc_now = new Date().getTime();

        let { last_posted } = account_info;

        if (last_posted !== 'null' && last_posted !== undefined) {

            let last_posted_in_ms = new Date(last_posted).getTime();

            let time_difference = utc_now - last_posted_in_ms;

            let one_day_in_ms = 24 * 60 * 60 * 1000;

            if (time_difference < one_day_in_ms) {

                await this.setState({ disable_create_new_post: true });
            }

        }
    }


    Set_Last_Date_Posted = async () => {

        let { set_last_post } = this.context.Request_URLs

        let res = await (await fetch(set_last_post, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: this.state.account_info.email })
        })).json();

        let last_date_posted = res?.last_posted;

        let split_data = last_date_posted?.split("T")[0]?.split("-");

        return { year: parseInt(split_data[0]), month: parseInt(split_data[1]), str: last_date_posted };

    }

    Create_Editor = () => {

        let Get_Posts_On_This_Month = async () => {

            let last_posted = await this.Set_Last_Date_Posted();

            await this.props.Get_Posts_On_This_Month(last_posted);

            await window.LoginAttempt();

            let { account_info } = this.state;

            account_info.last_posted = last_posted.str;

            await this.setState({ account_info });

            await this.Disable_Create_New_Post();
        }

        let Exit =  async (e) => {

            this.setState({
                editor_opened: false
            });
        }

        return <div id="the-editor-wrapper" className={`${this.state.editor_opened ? "editor-opened" : ""}`}>

            <div id="the-editor-exit-button" onClick={Exit}></div>

            <The_Editor Get_Posts={Get_Posts_On_This_Month} account_info={this.state.account_info} selected_post={this.state.selected_post} connection_list={this.state.connection_list} />

        </div>;
    }

    render() {

        return <div id="post-editor">
            
            {this.state.editor_opened ? this.Create_Editor() : null }

            <div id="buttons-wrapper">

                <div className={`post-button ${this.state.disable_create_new_post ? "disabled" : ""}`} id="create-new-post-button" onClick={(e) => {
                    if (this.state.disable_create_new_post) {

                        let {last_posted} = this.state.account_info;

                        let last_posted_ms = new Date(last_posted).getTime();
                        let now_ms = new Date().getTime();

                        let time_diff = now_ms - last_posted_ms;

                        let hours_left = Math.floor((24 * 60 * 60 * 1000 - time_diff) / (60 * 60 * 1000));
                        
                        let minutes_left = Math.floor((24 * 60 * 60 * 1000 - time_diff) % (60 * 60 * 1000) / (60 * 1000));

                        let seconds_left = Math.floor((24 * 60 * 60 * 1000 - time_diff) % (60 * 1000) / 1000);

                        alert(`You can create your next post in ${hours_left} hours, ${minutes_left} minutes, and ${seconds_left} seconds.`);
                        
                        return;
                    }

                    this.setState({ editor_opened: true, selected_post: null });
                }}>

                    <div id="new-post-icon" className="post-icon" style={{backgroundImage: `url(./static/add_post_icon.png)`}}></div>

                    <label>New Post</label>

                </div>

                <div className="post-button" id="edit-post-button" onClick={(e) => { this.setState({ editor_opened: true, selected_post: this.existing_post }); }}>

                    <div id="edit-post-icon" className="post-icon" style={{backgroundImage: `url(./static/edit_post_icon.png)`}}></div>

                    Edit Post

                </div>

            </div>

        </div>;
    }
}

export default Post_Editor;
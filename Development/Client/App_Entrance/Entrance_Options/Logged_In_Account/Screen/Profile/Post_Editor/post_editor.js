import React, { Component } from 'react';
import The_Editor from './The_Editor/the_editor.js';
import Single_Post_Editor from '@logged_in_account/Universal_Components/Single_Post_Editor/single_post_editor.js';
import Context from '@context/context.js';
import {Posts} from '@profile_template/profile_template.js';
import './post_editor.less';

class Post_Editor extends Posts {

    Single_Post = Single_Post_Editor;

    constructor(props) {

        super(props);

        this.existing_post = null; // This will hold the post that is being edited, if any

        Post_Editor.contextType = Context;

        let state = {
            owner_user_account: props.owner_user_account,
            disable_create_new_post: false,
            connection_list: props.connection_list
        };

        for(let key in state){
            this.state[key] = state[key];
        }
    }

    async componentDidUpdate(prevProps, prevState){
        
        if(this.props === prevProps){
            return;
        }

        super.componentDidUpdate(prevProps, prevState);

    }

    componentDidMount() {

        super.componentDidMount();

        this.Disable_Create_New_Post();
    }

    Disable_Create_New_Post = async () => {

        let { owner_user_account } = this.state;

        if(!owner_user_account){
            return;
        }

        let now = Date.now();

        let last_posted = await this.Get_User_Last_Posted();

        if (last_posted) {

            let time_difference = now - last_posted;

            let one_day_in_ms = 24 * 60 * 60 * 1000;

            if (time_difference < one_day_in_ms) {

                await this.setState({ disable_create_new_post: true });
                
            }

        }
    }

    Create_Editor = () => {

        let {owner_user_account, selected_post} = this.state;
        let {return_previous_display} = this.props;

        return <div id="the-editor-wrapper">

            <The_Editor owner_user_account={owner_user_account} 
                refresh_posts={this.Setup_Calendar}
                selected_post={selected_post} 
                return_previous_display={return_previous_display}
            />

        </div>;
    }

    Go_To_Editor = async ()=>{

        let {change_display} = this.props;

        change_display(this.Create_Editor);
    }

    Go_To_Create_Post = async () =>{

        if (this.state.disable_create_new_post) {

            let last_posted = await this.Get_User_Last_Posted();

            let last_posted_ms = new Date(last_posted).getTime();
            let now_ms = Date.now();

            let time_diff = now_ms - last_posted_ms;

            let hours_left = Math.floor((24 * 60 * 60 * 1000 - time_diff) / (60 * 60 * 1000));
            
            let minutes_left = Math.floor((24 * 60 * 60 * 1000 - time_diff) % (60 * 60 * 1000) / (60 * 1000));

            let seconds_left = Math.floor((24 * 60 * 60 * 1000 - time_diff) % (60 * 1000) / 1000);

            alert(`You can create your next post in ${hours_left} hours, ${minutes_left} minutes, and ${seconds_left} seconds.`);
            
            return;
        }

        this.existing_post = this.state.selected_post;

        await this.setState({selected_post: null});

        let {change_display} = this.props;

        change_display(this.Create_Editor);

    }

    render() {

        return <div id="post-editor">
        

            <div id="buttons-wrapper">

                <div className={`post-button ${this.state.disable_create_new_post ? "disabled" : ""}`} 
                    id="create-new-post-button" 
                    onClick={this.Go_To_Create_Post}>

                    <div id="new-post-icon" className="post-icon" style={{backgroundImage: `url(./static/add_post_icon.png)`}}></div>

                    <label>New Post</label>

                </div>

                <div className="post-button" id="edit-post-button" onClick={this.Go_To_Editor}>

                    <div id="edit-post-icon" className="post-icon" style={{backgroundImage: `url(./static/edit_post_icon.png)`}}></div>

                    Edit Post

                </div>

            </div>
            
            <div id="post-display-wrapper">

                {super.render()}

            </div>

        </div>;
    }
}

export default Post_Editor;
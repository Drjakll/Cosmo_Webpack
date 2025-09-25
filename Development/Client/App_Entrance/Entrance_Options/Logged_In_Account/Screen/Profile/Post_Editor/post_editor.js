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
            disable_create_new_post: false
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

    Disable_Create_New_Post = () => {

        let { account_info } = this.state;

        if(!account_info){
            return;
        }

        let { Configurations } = this.context;

        let { UTC_Time_Now } = Configurations;

        let utc_now = UTC_Time_Now();

        let { last_posted } = account_info;

        if (last_posted !== 'null' && last_posted !== undefined) {

            let split_date = last_posted.split("T")[0].split("-");

            let l_year = parseInt(split_date[0]);
            let l_month = parseInt(split_date[1]);
            let l_day = parseInt(split_date[2]);

            let { year, month, date } = utc_now; 

            if (year === l_year && month === l_month && date === l_day) {

                this.setState({ disable_create_new_post: true });
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

            this.Disable_Create_New_Post();
        }

        let Exit =  async (e) => {

            this.setState({
                editor_opened: false
            });
        }

        return <div id="the-editor-wrapper" className={`${this.state.editor_opened ? "editor-opened" : ""}`}>

            <div id="the-editor-exit-button" onClick={Exit}></div>

            <The_Editor Get_Posts={Get_Posts_On_This_Month} account_info={this.state.account_info} selected_post={this.state.selected_post} />

        </div>;
    }

    render() {

        return <div id="post-editor">
            
            {this.state.editor_opened ? this.Create_Editor() : <></> }

            <div id="buttons-wrapper">

                <div className={`post-button ${this.state.disable_create_new_post ? "disabled" : ""}`} id="create-new-post-button" onClick={(e) => {
                    if (this.state.disable_create_new_post) {
                        alert("Only one post can be created per day."); 
                        return;
                    }

                    this.setState({ editor_opened: true, selected_post: null });
                }}>

                    New Post

                </div>

                <div className="post-button" id="edit-post-button" onClick={(e) => { this.setState({ editor_opened: true, selected_post: this.existing_post }); }}>

                    Edit Post

                </div>

            </div>

        </div>;
    }
}

export default Post_Editor;
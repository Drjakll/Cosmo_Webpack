import React, { Component, createRef } from 'react';
import Text_Node from './Text_Node/text_node.js';
import Popup_Msg from '@popup_template/Popup_Message/popup_message.js';   
import './the_texts.less';

// Lexical imports
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

customElements.define("text-node", Text_Node);

class The_Texts extends Component {

    titleRef = createRef()
    bodyRef = createRef()

    constructor(props) {

        super(props);

        let { post, owner_user_account, post_photos, selected_photos, connection_list } = props;

        The_Texts.contextType = window.Context;

        this.state = {
            post,
            post_photos: post_photos,
            owner_user_account,
            selected_photos: selected_photos,
            connection_list: connection_list
        };
    }

    componentDidMount() {

        this.titleRef.current.value = this.state.post?.title ?? "";
        

        this.bodyRef.current.innerHTML = this.state.post?.body ? this.state.post.body : "";

    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps === this.props) {
            return;
        }

        this.setState(this.props);

    }

    Update_Post = (e) => {

        let { post, owner_user_account } = this.state;

        let { Post_Data_Templates } = this.context;
        let { Post_Data_Template } = Post_Data_Templates;

        let title = this.titleRef.current.value;
        let body = this.bodyRef.current.innerHTML;

        post = post ? post : Post_Data_Template({ user_id: owner_user_account.id });

        post.title = title;
        post.body = body;

        this.props.update(post);

    }

    Delete_Post = async (e) => {

        let confirmation = {agree: false};

        await Popup_Msg("confirm", "Are you sure you want to delete this post?", confirmation);

        if(!confirmation.agree){
            return;
        }

        let { delete_post } = this.context.Request_URLs;

        let {id, created_on} = this.state.post;

        let {id: user_id} = this.state.user_account_data;

        let res = await (await fetch(delete_post, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, user_id, created_on })
        })).json();

        let {refresh_posts, return_previous_display} = this.props;

        await Popup_Msg("message", res?.message);

        await refresh_posts();

        //Exit the editor
        return_previous_display();

    }

    Inject_XML_To_Text = (is_inject = true) => {

        let selection = window.getSelection();

        if (!selection.rangeCount)
            return;

        let range = selection.getRangeAt(0);

        let text = range.toString(); //extract the selected text

        let parent = range.commonAncestorContainer;

        let child = null;


        //Make sure that the selection is within the text editor
        while (parent && parent.id !== "the-body-input") {

            child = parent;

            parent = parent.parentNode;
        }

        if (!parent || parent.id !== "the-body-input") {
            return;
        }
        //End of making sure selection is within text editor

        if (child && child.nodeType !== 3) {
            parent.removeChild(child);
        }

        range.deleteContents();

        if (is_inject) {

            let new_element = document.createElement('text-node');

            new_element.setAttribute("text", text);
            new_element.setAttribute("photo_links", JSON.stringify(this.state.selected_photos));
            new_element.setAttribute("aws_s3_url", this.context.Request_URLs.aws_s3_url);

            range.insertNode(new_element);

        } else {

            range.insertNode(document.createTextNode(text));

        }

        selection.removeAllRanges();


    }

    Step_Out_Of_Highlight = (e) => {

        if (e.code === "ControlLeft") {
            document.activeElement.blur();
            document.querySelector("#the-body-input").focus();
        }
    }

    Tab = (e)=>{

        if(e.key === "Tab"){
            e.preventDefault();
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);

            range.insertNode(document.createTextNode("\t"));

            selection.removeAllRanges();
        }
    }

    render() {

        let { post } = this.state;

        return <div id="the-post-texts-editor">

            <div id="the-text-editor-area">

                <div id="the-title-input-wrapper">

                    <input id="the-title-input" ref={this.titleRef}></input>

                </div>

                <div id="text-editor-button-area">

                    <button onClick={(e) => { this.Inject_XML_To_Text(true); }}>Inject</button>

                    <button onClick={(e) => { this.Inject_XML_To_Text(false); }}>Strip</button>

                </div>

                <div id="the-body-input-wrapper">

                    <pre id="the-body-input" contentEditable={true} ref={this.bodyRef} onKeyDown={this.Tab}/> 

                </div>

            </div>

            <div id="the-buttons-area">

                <div id="the-save-button" className="post-button" onClick={this.Update_Post}>
                    Save
                </div>

                <div id="the-delete-button" className="post-button" onClick={this.Delete_Post}>
                    Delete
                </div>

            </div>

        </div>;
    }
}

export default The_Texts;
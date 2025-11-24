import React, { Component, createRef } from 'react';
import Text_Node from './Text_Node/text_node.js';   
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

        let { post, account_info, post_photos, selected_photos, connection_list } = props;

        The_Texts.contextType = window.Context;

        this.state = {
            post: post,
            post_photos: post_photos,
            account_info: account_info,
            selected_photos: selected_photos,
            connection_list: connection_list
        };
    }

    componentDidMount() {

        this.titleRef.current.innerHTML = this.state.post?.title ? this.state.post.title : "";
        this.bodyRef.current.innerHTML = this.state.post?.body ? this.state.post.body : "";

    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps === this.props) {
            return;
        }

        this.setState(this.props);

    }

    Update_Post = (e) => {

        let { post, account_info } = this.state;

        let { Post_Data_Templates } = this.context;
        let { Post_Data_Template } = Post_Data_Templates;

        let title = this.titleRef.current.innerText;
        let body = this.bodyRef.current.innerHTML;

        post = post ? post : Post_Data_Template({ owner_email: account_info.email });

        post.title = title;
        post.body = body;

        this.props.update(post);

    }

    Delete_Post = async (e) => {

        let { delete_post } = this.context.Request_URLs;

        let res = await (await fetch(delete_post, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: this.state.post.id, owner_email: this.state.account_info?.email })
        })).json();

        await this.Delete_Post_Photos(this.state.post_photos);
        await this.Delete_Photo_Links(this.state.post_photos);

        await this.props.Get_Posts();

        global_connection_socket?.emit("refresh_group_alerts", {request_to_emails: this.state.connection_list});

    }

    Delete_Post_Photos = async (photos) => {

        let { delete_photo_files } = this.context.Request_URLs;

        let res = await (await fetch(delete_photo_files, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ photos: photos })
        })).json();

    }

    Delete_Photo_Links = async (photos) => {

        let { delete_post_photo_links } = this.context.Request_URLs;

        let res = await (await fetch(delete_post_photo_links, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(photos)
        })).json();
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

    render() {

        let { post } = this.state;

        return <div id="the-post-texts-editor">

            <div id="the-text-editor-area">

                <div id="the-title-input-wrapper">

                    <pre id="the-title-input" contentEditable ref={this.titleRef} />

                </div>

                <div id="text-editor-button-area">

                    <button onClick={(e) => { this.Inject_XML_To_Text(true); }}>Inject</button>

                    <button onClick={(e) => { this.Inject_XML_To_Text(false); }}>Strip</button>

                </div>

                <div id="the-body-input-wrapper">

                    <pre id="the-body-input" contentEditable ref={this.bodyRef} /> 

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
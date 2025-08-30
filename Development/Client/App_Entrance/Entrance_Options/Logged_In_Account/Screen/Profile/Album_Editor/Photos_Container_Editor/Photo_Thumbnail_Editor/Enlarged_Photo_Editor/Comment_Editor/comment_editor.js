import React, { Component } from 'react';
import './comment_editor.less';

class Comment_Editor extends Component {

    constructor(props) {

        super(props);

        Comment_Editor.contextType = window.Context;

        let { comment_info } = props;

        this.state = {
            comment_info: comment_info
        };
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        this.setState(this.props);
    }

    Delete_Comment_Button = (key) => {

        let delete_comment = async (e) => {

            let { Request_URLs } = this.context;

            let { delete_photo_comment } = Request_URLs;

            let res = await (await fetch(
                delete_photo_comment,
                {
                    method: "POST",
                    body: JSON.stringify(this.state.comment_info),
                    headers: {
                        'Content-Type': "application/json"
                    }
                }
            )).json();

            this.props.Get_Photo_Comments();

        }

        return <div className="editor-button-wrapper" key={key}>

            <div id="button-icon" onClick={delete_comment}>

                <label>x</label>

            </div>

        </div>
    }

    Editor_Buttons = [
        this.Delete_Comment_Button
    ]

    render() {

        return <div id="comment-editor-buttons">

            {this.Editor_Buttons.map((button, key) => {

                return button(key);

            })}

        </div>;
    }
}

export default Comment_Editor;
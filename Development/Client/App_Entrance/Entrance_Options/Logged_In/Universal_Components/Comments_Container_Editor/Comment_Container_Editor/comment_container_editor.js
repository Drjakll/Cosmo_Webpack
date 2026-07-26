import React from 'react';
import Comment_Container from '@comment_container';
import Comments_Container_Editor from '@comments_container_editor';
import './comment_container_editor.less';

class Comment_Container_Editor extends Comment_Container {

    Comments = Comments_Container_Editor

    constructor(props){

        super(props);

    }

    Select_This_Comment = ()=>{

        let {selected, comment_info} = this.state;

        let {select_comment, unselect_comment} = this.props;

        if(selected){
            unselect_comment(comment_info.id);
        } else {
            select_comment(comment_info.id);
        }

        this.setState({selected});
    }

    render(){

        let {selected} = this.state;

        return <div id="comment-container-editor">

            <div id="select-comment-box" onClick={this.Select_This_Comment}>

                {selected ? "x" : ""}

            </div>

            {super.render()}

        </div>;
    }
}

export default Comment_Container_Editor;
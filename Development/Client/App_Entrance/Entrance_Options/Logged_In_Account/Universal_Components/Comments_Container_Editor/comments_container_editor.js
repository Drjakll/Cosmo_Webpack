import React from 'react';
import Context from '@context/context.js';
import Comments_Container from '@comments_container/comments_container.js';
import Comment_Container_Editor from './Comment_Container_Editor/comment_container_editor.js';
import './comments_container_editor.less';

class Comments_Container_Editor extends Comments_Container {

    static contextType = Context

    Single_Comment_Container = Comment_Container_Editor

    constructor(props){

        super(props);

        this.state.selected_comments = {}
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        this.setState({selected_comments: {}});
        
        super.componentDidUpdate(prevProps, prevState);
    }

    Select_Comment = (id)=>{

        let {selected_comments} = this.state;

        selected_comments[id] = true;

        this.setState({selected_comments});
    }

    Unselect_Comment = (id)=>{

        let {selected_comments} = this.state;

        delete selected_comments[id];

        this.setState({selected_comments});
    }

    Show_Editor_Options = ()=>{

        let Delete_Comments = async ()=>{

            if(!confirm("Are you sure?")){
                return;
            }

            let { delete_multiple_comments } = this.context.Request_URLs;

            let {selected_comments} = this.state;

            let to_delete = [];

            for(let id in selected_comments){
                to_delete.push(id);
            }

            let body = {requirements: [to_delete]};

            await fetch(delete_multiple_comments,
                {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            selected_comments = {};

            this.setState({selected_comments});

            this.Signal_Refresh_This_Section_Comments();

            this.Signal_Refresh_Parent_Comments();
        }

        return <div id="comments-editor-options">

            <div id="delete-selected-comments-button" onClick={Delete_Comments}>

                Delete Selections

            </div>

        </div>;
    }

    render(){

        return <div id="comments-container-editor">

            {super.render()}

        </div>;
    }
}

export default Comments_Container_Editor;
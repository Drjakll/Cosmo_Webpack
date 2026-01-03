import React, {Component, createRef} from 'react';
import Context from '@context/context.js';
import './comment_input.less';

class Comment_Input extends Component {

    static contextType = Context;

    textRef = createRef()

    constructor(props){

        super(props);

        let { 
            target_id,
            target_type,
            reply_to_id,
            owner_user_account,
            visitor_user_account
        } = props;

        this.state = {
            target_id,
            target_type,
            reply_to_id : reply_to_id || null,
            owner_user_account,
            visitor_user_account
        };
    }

    componentDidUpdate(prevProps, prevState){

        if(this.props !== prevProps){
            
            this.setState(this.props);
        }
    }

    Submit_Message = async ()=>{

        let { submit_comment } = this.context.Request_URLs;

        let {Signal_To_Refresh_Comments} = this.props;

        let {visitor_user_account, target_id, target_type, reply_to_id} = this.state;

        let body = {
            user_id: visitor_user_account.id,
            target_id,
            target_type,
            reply_to_id,
            comment: this.textRef.current.value 
        };

        

        await fetch(submit_comment,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        this.textRef.current.value = "";

        Signal_To_Refresh_Comments();

    }

    render(){

        return (<div id="comment-input-wrapper">

            <div id="input-wrapper">

                <div id="textarea-wrapper">

                    <textarea 
                        ref={this.textRef}
                        onKeyDown={ async (e)=>{

                            if(e.key !== "Enter"){
                                return;
                            }

                            await this.Submit_Message();

                        }}>

                    </textarea>

                </div>

                <div id="send-button-wrapper">

                    <div id="send-button" onClick={async (e)=>{ await this.Submit_Message(); }}>

                        Send
                        
                    </div>

                </div>

            </div>

        </div>);
    }
}

export default Comment_Input;
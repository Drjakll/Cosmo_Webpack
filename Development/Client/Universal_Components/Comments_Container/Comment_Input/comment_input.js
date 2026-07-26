import React, {Component, createRef} from 'react';
import Request_URLs from '@request_urls';
import popup_message from '@popup_message';
import './comment_input.less';

class Comment_Input extends Component {

    textRef = createRef()

    constructor(props){

        super(props);

        let { 
            target_id,
            target_id_type,
            reply_to_id,
            owner_user_account,
            visitor_user_account
        } = props;

        this.state = {
            target_id,
            target_id_type,
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

        if(this.textRef.current.value.replace(/ /g, "") === ""){
            await popup_message("message","Message cannot be empty!");
            return;
        }

        let { submit_comment } = Request_URLs;

        let {Signal_To_Refresh_For_New_Comments} = this.props;

        let {visitor_user_account, owner_user_account, target_id, target_id_type, reply_to_id} = this.state;

        if(!target_id_type || !target_id){
            await popup_message("message","Target ID and Target Type not found");
            return;
        }

        let body = {
            owner_user_id: owner_user_account.id,
            commenter_user_id: visitor_user_account.id,
            target_id,
            target_id_type,
            reply_to_id,
            comment: this.textRef.current.value 
        };

        

        let data = await (await fetch(submit_comment,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )).json();

        this.textRef.current.value = "";

        if(!data){

            await popup_message("message", "Error submitting request");

        } else if(data.blocked){
            
            await popup_message("message", data.message);

        } else {

            Signal_To_Refresh_For_New_Comments();
        }

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
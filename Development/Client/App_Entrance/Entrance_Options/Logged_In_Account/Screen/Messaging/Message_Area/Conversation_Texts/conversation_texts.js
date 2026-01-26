import React, {Component, createRef} from 'react';
import Msg_Entry from './Msg_Entry/msg_entry.js';
import './conversation_texts.less';

class Conversation_Texts extends Component {

    containerRef = createRef(); //Use to check container see if overflow occurs

    prev_msg_length = 0; //The number of text messages

    no_more_text_msg = false;

    constructor(props){

        super(props);

        Conversation_Texts.contextType = window.Context;

        let {my_account, conversation, user_status, private_or_public} = this.props;

        this.state = {
            my_account,
            conversation,
            user_status,
            private_or_public
        };
    }

    async componentDidUpdate(prevProps, prevState){

        if(this.props === prevProps){
            return;
        }

        await this.setState(this.props);

        //If the number of current text messages is different from previous number of text messages, then scroll down
        let current_length = this.props.conversation?.messages?.length;

        if(this.prev_msg_length !== current_length){

            this.Scroll_To_Bottom();
        }

        this.prev_msg_length = current_length;
    }

    Scroll_To_Bottom = () => {
        
        let container = this.containerRef.current;

        if(!container){
            return;
        }

        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        });

    }

    Scroll_To_View_More_Messages = async (e)=>{
        
        if(e.target.scrollTop > 300 || this.no_more_text_msg === true){
            return;
        }

        let {conversation} = this.state;

        let {messages} = conversation;

        let {conversation_id, created_on} = messages[0];

        let more_msges = await this.props.get_private_conversation_messages(conversation_id, created_on);

        if(more_msges.length === 0){
            this.no_more_text_msg = true;
            return;
        }

        conversation.messages = more_msges.concat(messages);

        this.setState({conversation});

    }

    render(){

        let {conversation, my_account, user_status, private_or_public} = this.state;

        let {messages, users} = conversation || {};

        let time_joined = user_status?.time_joined || 0;

        let seen_by = users?.filter((v)=>{ return v.id !== my_account.id && v.seen_last; });

        return <div id="conversation-texts">

            {this.props.has_selected_conversation() ? 
            
                <div id="conversation-msges" ref={this.containerRef} onScroll={this.Scroll_To_View_More_Messages}>

                    {messages?.map((value, index)=>{

                        let time_added = value.created_on;

                        return time_joined < time_added ? <div className="msg-entry-wrapper" key={`${value.id}${value.created_on}`}>

                            <Msg_Entry 
                                msg_obj={value} 
                                my_account={my_account}
                            />

                        </div> : "";

                    })}

                </div> 

            : 

                <div id="no-conversation-selected">

                    <pre>No conversation selected</pre>     

                </div>

            }

            <div id="seen-by">

                {!seen_by?.length || private_or_public === "public" ? "" : <pre>Noticed by </pre>} 
                {seen_by?.map((user, ind)=>{

                    let {first_name, last_name, id} = user;
                    
                    return <pre className="seen-by-name" key={id}>
                        
                        {` ${first_name || ""} ${last_name || ""} ${ind === seen_by.length - 1 ? "" : ", "}`}

                    </pre>;

                })}

            </div>

        </div>;
    }
}

export default Conversation_Texts;
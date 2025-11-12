import React, {Component, createRef} from 'react';
import Msg_Entry from './Msg_Entry/msg_entry.js';
import './conversation_texts.less';

class Conversation_Texts extends Component {

    containerRef = createRef(); //Use to check container see if overflow occurs

    prev_msg_length = 0; //The number of text messages

    constructor(props){

        super(props);

        Conversation_Texts.contextType = window.Context;

        let {my_account, conversation, user_status, current_users_info, private_or_public} = this.props;

        this.state = {
            my_account,
            conversation,
            user_status,
            current_users_info,
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

    render(){

        let {conversation, my_account, current_users_info, user_status, private_or_public} = this.state;

        let {messages, seen_by} = conversation || {};

        let time_joined = user_status?.time_joined || 0;

        let emails = Object.keys(seen_by || {});

        emails = emails.filter((v)=>{ return v !== my_account.email; });

        return <div id="conversation-texts">

            <div id="conversation-msges" ref={this.containerRef}>

                {messages?.map((value, index)=>{

                    let time_added = parseInt(value.timestamp || 0);

                    return time_joined < time_added ? <div className="msg-entry-wrapper" key={`${value.from.email}${value.timestamp}`}>

                        <Msg_Entry 
                            msg_obj={value} 
                            my_account={my_account}
                            recipient_info={current_users_info[value?.from?.email]}
                        />

                    </div> : "";

                })}

            </div>

            <div id="seen-by">

                {emails.length === 0 || private_or_public === "public" ? "" : <pre>Seen by </pre>} 
                {emails.map((email, ind)=>{

                    let {first_name, last_name} = this.state.current_users_info[email] || {};
                    
                    return <pre className="seen-by-name" key={email}>
                        
                        {` ${first_name} ${last_name} ${ind === emails.length - 1 ? "" : ", "}`}

                    </pre>;

                })}

            </div>

        </div>;
    }
}

export default Conversation_Texts;
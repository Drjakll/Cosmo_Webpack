import React, {Component, createRef} from 'react';
import Msg_Entry from './Msg_Entry/msg_entry.js';
import './conversation_texts.less';

class Conversation_Texts extends Component {

    containerRef = createRef(); //Use to check container see if overflow occurs

    prev_msg_length = 0; //The number of text messages

    no_more_text_msg = false;

    last_scroll_position = 0;

    constructor(props){

        super(props);


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

        let {conversation: this_conversation} = this.props;
        let {conversation: last_conversation} = prevProps;

        if(this_conversation?.id !== last_conversation?.id){

            await this.Scroll_To_View_More_Messages(null);

        }

        //If the number of current text messages is different from previous number of text messages, then scroll down
        let current_length = this.state.conversation?.messages?.length;

        if(this.prev_msg_length !== current_length){

            setTimeout(()=>{
                this.Scroll_To_Bottom();
            }, 250);
        }

        this.prev_msg_length = current_length;
        this.no_more_text_msg = false;
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

        if(e){

            let is_scrolling_down = this.last_scroll_position < e.target.scrollTop;

            this.last_scroll_position = e.target.scrollTop;
            
            if(is_scrolling_down || e.target.scrollTop != 0 || this.no_more_text_msg === true){

                return;
            }

        }

        let {conversation} = this.state;

        if(!conversation){
            return;
        }

        let {messages, self_time_joined} = conversation;

        let {conversation_id, created_on, id} = messages[0] ?? {id: 0, conversation_id: conversation.id, created_on: Date.now()};

        let more_msges = await this.props.get_private_conversation_messages(conversation_id, created_on, self_time_joined);

        if(more_msges.length === 0){
            this.no_more_text_msg = true;
            return;
        }
        
        more_msges = more_msges.reverse();

        conversation.messages = more_msges.concat(messages);

        await this.setState({conversation});

        setTimeout(()=>{

            let key = `${id}${created_on}`;

            window.location.assign(`#${key}`);

        }, 100);

    }



    render(){

        let {conversation, my_account, user_status, private_or_public} = this.state;

        let {messages, users} = conversation || {};

        let time_joined = user_status?.time_joined || 0;

        let seen_by = users?.filter((v)=>{ return v.id !== my_account.id && v.seen_last; });

        return <div id="conversation-texts">

            {this.props.has_selected_conversation() ? 
            
                <div id="conversation-msges" ref={this.containerRef} onScroll={(e)=>{ this.Scroll_To_View_More_Messages(e); }}>

                    {messages?.map((value, index)=>{

                        let {id, created_on} = value;

                        let key = `${id}${created_on}`


                        return time_joined < created_on ? <div id={key} className={`msg-entry-wrapper`} key={key}>

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
                    
                    return <pre className="seen-by-name" key={ind}>
                        
                        {` ${first_name || ""} ${last_name || ""} ${ind === seen_by.length - 1 ? "" : ", "}`}

                    </pre>;

                })}

            </div>

        </div>;
    }
}

export default Conversation_Texts;
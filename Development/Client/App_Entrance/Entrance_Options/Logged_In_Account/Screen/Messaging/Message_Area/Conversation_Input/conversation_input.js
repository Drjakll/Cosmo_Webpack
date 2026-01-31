import React, {Component, createRef} from 'react';
import './conversation_input.less';

class Conversation_Input extends Component {

    msg_ref = createRef();

    Shift_Down = false;

    Misc_Buttons = [
        {
            label: "Leave",
            action: (e)=>{

                if(!this.props.has_selected_conversation()){
                    alert("No conversation is selected");
                    return;
                }

                let answer = confirm("You sure you want to leave this conversation?");

                if(!answer){
                    return;
                }

                if(this.props.private_or_public === "private"){

                    this.props.send_msg(`I am leaving this conversation...`);

                }

                this.props.leave_conversation();
            }
        }
    ];

    constructor(props){

        super(props);
        
    }

    Send_Message = (e)=>{

        let msg = this.msg_ref.current.value;

        if(msg.replace(/ /g, '') === ''){
            return;
        }

        this.props.send_msg(msg);

        this.msg_ref.current.value = "";
    }

    Press_Enter_To_Send_Msg = (e)=>{

        if(e.key === 'Enter' && !this.Shift_Down){
            this.Send_Message(e);
        }
    }

    Is_Shift_Key_Down = (e)=>{

        if(e.key === "Shift"){
            this.Shift_Down = true;
        }

        this.Press_Enter_To_Send_Msg(e);
    }

    Is_Shift_Key_Up = (e)=>{

        if(e.key === "Shift"){
            this.Shift_Down = false;
        }
    }

    render(){

        return <div id="conversation-input" onKeyDown={this.Is_Shift_Key_Down} onKeyUp={this.Is_Shift_Key_Up}>

            <div id="misc-functions">

                {this.Misc_Buttons.map((obj, ind)=>{

                    let {label, action} = obj;

                    return <div className="misc-button-wrapper" key={label}>

                        <div id="misc-button" onClick={action}>

                            {label}

                        </div>

                    </div>;

                })}

            </div>
            
            <div id="text-input-wrapper">

                <textarea id="text-input" ref={this.msg_ref}>

                </textarea>

                <div id="send-input-text-button" onClick={this.Send_Message}>

                    Send

                </div>

            </div>

        </div>;
    }
}

export default Conversation_Input;
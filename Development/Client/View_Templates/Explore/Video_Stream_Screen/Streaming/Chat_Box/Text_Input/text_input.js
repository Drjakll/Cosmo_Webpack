import React, { Component, createRef } from 'react';
import './text_input.less';
class Text_Input extends Component {

    inputRef = createRef();

    constructor(props){
        
        super(props);

        this.Shift = false;
        
        this.state = {
            socket: this.props.socket,
            my_room_tag: this.props.my_room_tag,
            owner_user_account: this.props.owner_user_account
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        this.setState(this.props);
    }

    Send_Message = (socket, e = null) => {

        if ((e !== null && e.key !== 'Enter')) {

            return;

        }

        let text = this.inputRef.current.value;

        this.inputRef.current.value = ``;

        socket?.emit('send_text', {text: text, from: this.state.my_room_tag, account_data: this.state.owner_user_account});

    }

    Shift_On = (e) => {

        if (e.shiftKey) {
            this.Shift = true;
        }

    }

    Release_Shift = (e) => {

        if (e.shiftKey) {
            this.Shift = false;
            return;
        }

        if (e.key === 'Enter') {
            this.inputRef.current.value = '';
        }
    }
    
    render(){
        
        return <div id="text-input">
            
            <div id="input-wrapper">

                <textarea id="input" 
                    ref={this.inputRef}
                    contentEditable={true}
                    onKeyDown={this.Shift_On}
                    onKeyPress={(e) => { this.Send_Message(this.state.socket, e); }}
                    onKeyUp={this.Release_Shift}>
                    
                </textarea>

                <div id="send-button"
                    onClick={(e) => { this.Send_Message(this.state.socket); }}
                >

                    Send

                </div>

            </div>
            
        </div>;
    }
}

export default Text_Input;
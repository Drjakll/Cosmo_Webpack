import React, { Component, createRef } from 'react';
import Message from './Message/message.js';
import Text_Input from './Text_Input/text_input.js';
import './chat_box.less';

class Chat_Box extends Component {

    chat_box_ref = createRef();

    constructor(props) {

        super(props);

        Chat_Box.contextType = window.Context;
        
        this.state = {
            conversation: [],
            socket: this.props.socket,
            my_room_tag: this.props.my_room_tag
        };
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props === prevProps) {
            return;
        }

        this.setState(this.props);
    }

    componentDidMount() {
        let { Drag } = this.context;

        this.drag = new Drag();

        this.Add_Socket_Events(this.state.socket);
    }

    Add_Socket_Events = (socket) => {

        socket.on('receive_new_text', ({from, text }) => {

            let new_text_obj = {};

            for (let i in from) {
                new_text_obj[i] = from[i];
            }

            new_text_obj.text = text;
            new_text_obj.timestamp = this.Get_Current_Local_Time();

            this.state.conversation.push(new_text_obj);

            this.setState({ conversation: this.state.conversation });

        });

    }

    Get_Current_Local_Time = () => {

        let now = new Date();

        return now.toLocaleTimeString();

    }

    render() {


        return (
            <div id="chat-box" ref={this.chat_box_ref}>

                <div id="drag-bar"
                    onMouseDown={(e) => { this.drag.init_child(e, this.chat_box_ref.current); }}
                    onMouseUp={(e) => { this.drag.disable_drag(e); }}
                >
                
                    Drag here
                    
                </div>

                <div id="text">
                
                    {this.state.conversation.map((value, index) => {

                        return <div className="message-wrapper" key={index}>

                            <Message data={value} my_room_tag={this.state.my_room_tag} />

                        </div>;

                    })}
                    
                </div>

                <div id="controls">

                    <Text_Input socket={this.state.socket} my_room_tag={this.state.my_room_tag} />

                </div>

            </div>
        );
    }
}

export default Chat_Box;
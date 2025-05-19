import React, { Component, createRef } from 'react';
import Message from './Message/message.js';
import './chat_box.less';

class Chat_Box extends Component {

    chat_box_ref = createRef();

    constructor(props) {

        super(props);

        Chat_Box.contextType = window.Context;
        
        this.socket = this.props.socket;
        this.my_room_tag = this.props.my_room_tag;
        
        this.state = {
            conversation: []
        };
    }

    componentDidMount() {
        let { Drag } = this.context;

        this.drag = new Drag();
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
                
                    {this.state.conversation.map((value, index)=>{
                        
                        return <div className="message-wrapper" key={index}>
                            
                            <Message data={value}/>
                            
                        </div>;
                        
                    })}
                    
                </div>

                <div id="controls">

                    

                </div>

            </div>
        );
    }
}

export default Chat_Box;
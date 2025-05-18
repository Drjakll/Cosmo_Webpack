import React, { Component, createRef } from 'react';
import './chat_box.less';

class Chat_Box extends Component {

    chat_box_ref = createRef();

    constructor(props) {

        super(props);

        Chat_Box.contextType = window.Context;
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

                </div>

                <div id="text-background">
                </div>

                <div id="controls">

                    

                </div>

            </div>
        );
    }
}

export default Chat_Box;